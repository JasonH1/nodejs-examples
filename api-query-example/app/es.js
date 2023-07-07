"use strict";

const _ = require('underscore'),
    request = require('request'),
    qs = require('querystring'),
    constants = require('./constants')(),
    settings = require('../settings') || {};

var host, username, password;
switch (process.env.CURRENT_ENV) {
  case 'PROD':
    host = process.env.ELASTICSEARCH_BASE_URL;
    username = process.env.ELASTICSEARCH_USERNAME;
    password = process.env.ELASTICSEARCH_PASSWORD;
    break;
  case 'DEV':
    host = process.env.ELASTICSEARCH_BASE_URL || settings.ELASTICSEARCH_BASE_URL;
    username = process.env.ELASTICSEARCH_USERNAME || settings.ELASTICSEARCH_USERNAME;
    password = process.env.ELASTICSEARCH_PASSWORD || settings.ELASTICSEARCH_PASSWORD;
    break;
  default:
    host = 'localhost:9200';
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


var makeRequest = function(method, path, query, data, cb){

  // if (!params.index){
  //   return cb(constants.REQUIRED('index'));
  // } else if (!params.type){
  //   return cb(constants.REQUIRED('type'));
  // } else if (!params.func){
  //   return cb(constants.REQUIRED('function'));
  // }

  var url = 'http://' + host + '/' + path;

  var headers = {};
  var queryStr = qs.stringify(query || {});

  if (queryStr) {
    url += '?' + queryStr;
  }

  headers['content-type'] = 'application/json; charset=UTF-8';

  request[method]({
    uri: url,
    auth: {
      user: username,
      pass: password
    },
    body: JSON.stringify(data),
    headers: headers
  }, (err, response, body) => {
    // console.log(err, response, body);
    if (err) {
      cb(err, undefined);
    } else if (response.statusCode === 400) {
      cb(parseResponse(body), undefined);
    } else {
      cb(err, parseResponse(body));
    }
  });
}

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

module.exports.ElasticSearch = ElasticSearch;