'use strict';

var query = require('./model').Query,
  ReportsSearch = require('./models/reportssearch').ReportsSearch,
  db,
  list,
  processor,
  errors,
  PROD = false;

var pageOptions = function(options) {
  var opts = options || {},
    page = parseInt(opts.page, 10),
    per_page = parseInt(opts.per_page, 10),
    from = parseInt(opts.from, 10),
    size = parseInt(opts.size, 10),
    start, end;

  if (isNaN(page) || page < 1) {
    page = 1;
  }
  if (isNaN(size)) {
    per_page = (isNaN(per_page) || per_page < 0) ? 20 : per_page;
  } else {
    per_page = size || 20;
  }
  if (!isNaN(from)) {
    page = undefined;
    if (from < 1) {
      from = 1;
    }
    start = from - 1;
  } else {
    from = undefined;
    start = (page - 1) * per_page;
  }
  end = start + (per_page - 1);
  if (!from) from = 0;

  return {
    from: start,
    size: per_page
  };
};

var get = function(req, res) {
 var estype = "",
    url,
    current,
    feed = "get",
    options,
    sortParams,
    q = req.query;
  options = pageOptions(q);
  q.from = options.from;
  q.size = options.size;

  if (!q.language) q.language = 'en';   
  //if (PROD && req.params.service === 'items') feed = "getprod";
  if (req.params.feed) feed = req.params.feed;

  switch(req.params.service) {
    case 'listings':
      estype = 'listing';
      url = "listings/_search";
      // set defaults
      if (!q.q) q.q = '*';
      current = require('./models/listings');
      break;
  }

  // url = req.params.service + '/' + estype + '/_search';
  var model = new query(req.params.service + '/' + feed, q);
  if (current) {
    sortParams = current.transform(q, model.DSL);
  }
  
  var dsl = model.DSL;
  
  // if we have index name and items id specified in request we get only one item and
  // generate new URL without DSL query
  if (req.params.index && req.params.id){
    dsl = {};
    url = req.params.index + '/' + estype + '/' + req.params.id;
  }

  if (req.user) q.userid = req.user.id;
  var reportModel = new ReportsSearch(q);
  console.log(url);
  db.GET(url, {}, dsl, function(err, response){
    if (err) {
      return errors.GENERIC(req, res, err);
    }

    // we ignore loging if requests coming without q parameter (means just pagination)
    // and if user send ignoreLogs parameter (needed for CMS)
    if (q.q !== '*' && req.query.ignoreLogs !== 'true' && estype === 'item'){
      db.POST('search_reports/search_logs', {}, reportModel.toJSON, function(err1, response1){});
    }
    response.sortParams = sortParams;
    processor.render(req, res, response);
  });
}

// ---------
// interface
// ---------

exports = module.exports = function(injectors) {
  if (!injectors.processor) throw "Need processor service";
  if (!injectors.errors) throw "Need errors service";
  if (!injectors.db) throw "Need database service";
  
  processor = injectors.processor;
  errors = injectors.errors;
  db = injectors.db;
  PROD = injectors.PROD;
  return {
    Get: function(req, res) { return get(req,res) }
  }
};
