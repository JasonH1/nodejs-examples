'use strict';

var db = require('./adapters/es'),
  _ = require('underscore'),
  Query = require('./model').Query;

class Listings {
  static add(params, cb) {
    // add a listing
    var current;
    const now = new Date();
    try {
      var validator = require('./models/add');
      current = new validator(params.data);
    } catch (err) {
      console.log('error: ', err);
      cb(null, {
        error: err
      });
      return;
    }
    // delete token if it was passed in POST or GET params
    if (params.data.token){
      delete params.data.token;
    }
    var data = params.data;
    data.post_date = now.toISOString();
    data.user = params.user.user_id;
    data.sub = params.user.sub;
    data.name = params.user.name;
    if (!data.description) data.description = "";
    if (!data.images) data.images = [];
    data.status = "active";

    db.ElasticSearch.POST('listings/listing/', null, data, cb);
  }

  static list(params, cb) {
    // list according to status option.
    var options = params;
    var q = {};
    q.from = options.data.from || 0;
    q.size = options.data.size || 20;
    q.status = params.data.status || 'active'; // default to active

    if (!q.q) {
      q.q = '*';
    }
    console.log(q);
    var model = new Query('list', q);
    db.ElasticSearch.GET('listings/_search', null, model.DSL, cb);
  }
  static status(params, cb) {
    // change the status
    var current;
    try {
      var validator = require('./models/status');
      current = new validator(params.data);
    } catch (err) {
      console.log(err);
      cb(null, {
        error: err
      });
      return;
    }

    // We just use UPDATE API to append change the status of a listing.
    var model = new Query('status', params.data);
    db.ElasticSearch.POST('listings/listing/' + params.data.id + '/_update', null, model.DSL, cb);
  }
  static get(params, cb) {
    // get by particular type...
    var options = params;
    var q = {};
    q.from = options.data.from || 0;
    q.size = options.data.size || 20;
    q.query = params.data.query || "*";

    var model = new Query('get', q);
    db.ElasticSearch.GET('listings/_search', null, model.DSL, cb);
  }

  static delall(params, cb) {
    var model = new Query('delete', {});
    db.ElasticSearch.DELETE('listings', null, model.DSL, cb);
  }  
}

exports = module.exports.Listings = Listings;