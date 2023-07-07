"use strict";

var _ = require('underscore');

class Query {
 constructor(name, params) {
    // try catch statements only work on synchronous code
  var self = this;
      
  try {
      // the synchronous code that we want to catch thrown errors on
      this._query = require('./dsl/'+ name +'.json');
      this._init = true;
      var keys = Object.keys(params);
      var dsl = JSON.stringify(this._query);
      _.each(keys, function(current) {
        dsl = dsl.replace('<'+current+'>', params[current]);
      });
      this.DSL = JSON.parse(dsl);

    } catch (err) {
      // handle the error safely
      this._query = {};
      this._init = false;
  }
    this._id = name;
 }
 get id() {
  return this._id;
 }
 get DSL() {
  return this._query;
 }
 set DSL(value) {
  this._query = value;
 }
}

module.exports.Query = Query;
