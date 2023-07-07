'use strict';

var processor = require('./processor')();

var version = 0.1;

var endpoints = {
  dev: {
    "domain": "http://micro-dev.mypets.asia",
    "search": "http://query-dev.mypets.asia",
    "avatar": {
      "domain": "http://img.sab247.com",
      "url": "/dev/users/{userId}/avatar"
    },
    "uploadUrl": "http://upload-dev.mypets.asia"
  },
  prod: {
    "domain": "http://micro-prod.mypets.asia",
    "search": "http://query-prod.mypets.asia",
    "avatar": {
      "domain": "http://img.sab247.com",
      "url": "/prod/users/{userId}/avatar"
    },
    "uploadUrl": "http://upload-prod.mypets.asia"
  }
};


// ----------------
// public functions
// ----------------

var pGet = function(req, res) {
  processor.render(req, res, {
    version: version,
    maintenance: process.env.MAINTENANCE === 'true',
    endpoints: endpoints,
    force_update_android: 0
  });
};

// ---------
// interface
// ---------

exports = module.exports = {
  get: pGet
};
