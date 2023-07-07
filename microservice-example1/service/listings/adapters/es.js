'use strict';

const _ = require('underscore'),
  request = require('request'),
  config = require('../../../config'),
  qs = require('querystring');

var host, username, password;

switch (config.env) {
  case 'PROD':
    host = process.env.ELASTICSEARCH_BASE_URL;
    username = process.env.ELASTICSEARCH_USERNAME;
    password = process.env.ELASTICSEARCH_PASSWORD;
    break;
  case 'DEV':
    host = 'https://' + config.ELASTICSEARCH_BASE_URL;
    username = config.ELASTICSEARCH_USERNAME;
    password = config.ELASTICSEARCH_PASSWORD;
    break;
  default:
    host = 'http://localhost:9200';
    username = '';
    password = '';
}



var parseResponse = function(response) {
  var parsed;
  try {
    parsed = JSON.parse(response);
  } catch (e) {
    parsed = response;
  }
  return parsed;
};


var makeRequest = function(method, path, query, data, cb) {

  // if (!params.index){
  //   return cb(constants.REQUIRED('index'));
  // } else if (!params.type){
  //   return cb(constants.REQUIRED('type'));
  // } else if (!params.func){
  //   return cb(constants.REQUIRED('function'));
  // }

  var url = host + '/' + path;

  var headers = {},
    // extract useRawData param from query, if present
    useRawData = !!query.useRawData;
  delete query.useRawData;

  var queryStr = qs.stringify(query || {});

  if (queryStr) {
    url += '?' + queryStr;
  }

  headers['content-type'] = 'application/json; charset=UTF-8';
  console.log('ES: ', url);
  request[method]({
    uri: url,
    auth: {
      user: username,
      pass: password
    },
    body: useRawData ? data : JSON.stringify(data),
    headers: headers
  }, (err, response, body) => {
    console.log('response:');
    console.log(body);
    console.log(err);
    if (err) {
      cb(null, err);
    } else if (response.statusCode === 400) {
      cb(null, parseResponse(body));
    } else {
      cb(null, parseResponse(body));
    }
  });
};

class ElasticSearch {
  static GET(path, query, data, cb) {
    makeRequest('get', path || '', query || {}, data || {}, cb || _.noop);
  }

  static POST(path, query, data, cb) {
    makeRequest('post', path || '', query || {}, data || {}, cb || _.noop);
  }

  static DELETE(path, query, data, cb) {
    makeRequest('del', path || '', query || {}, data || {}, cb || _.noop);
  }

  static PUT(path, query, data, cb) {
    makeRequest('put', path || '', query || {}, data || {}, cb || _.noop);
  }
}


exports = module.exports.ElasticSearch = ElasticSearch;