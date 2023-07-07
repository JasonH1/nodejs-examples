'use strict';

var _ = require('underscore'),
  express = require('express'),
  bodyParser = require('body-parser'),
  //cookieParser = require('cookie-parser'),
  methodOverride = require('method-override'),
  favicon = require('serve-favicon'),
  //cookieSession = require('cookie-session'),
  hbs = require('express-hbs');

var allowedDomains = {
  's1k.com': true, // this will allow next domains: 's1k.com', '*.s1k.com', '*.*.s1k.com' etc.
  localhost: true
};

var getHost = function(origin) {
  var regex = new RegExp('^(?:[a-z]+)://([0-9a-z_-]+(?:\\.[0-9a-z_-]+)*)(?::([0-9]{1,5})){0,1}', 'gi'),
    matchResult = regex.exec(origin || '');
  return matchResult && matchResult.length > 1 ? matchResult[1] : null;
};

var isAllowed = function(origin) {
  var host = getHost(origin);
  if (host) {
    return _.some(allowedDomains, function(enabled, domain) {
      if (enabled) {
        var regex = new RegExp('^(?:[0-9a-z_-]+\\.)*' + domain, 'gi');
        return regex.exec(host);
      } else {
        return false;
      }
    });
  } else {
    return false;
  }
};

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Request-Headers', 'X-Requested-With, accept, content-type');
  res.header('Access-Control-Allow-Headers', 'Set-Cookie, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-access-token');
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

exports = module.exports = function(app) {
  app.set('jwtTokenSecret', process.env.JWT_TOKEN_SECRET || 'siklocal');
  // Configuration for server
  app.engine('hbs', hbs.express3({
    extname: '.html',
    partialsDir: __dirname + '/src/partials'
  }));
  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/src/partials');
  app.use(allowCrossDomain);
  //app.use(cookieParser());
  //app.use(cookieSession({
  //  name: 'session',
  //  keys: ['key1', 'key2'],
  //  httpOnly: false
  //}));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.raw({
    type: 'application/yaml'
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use('/static', express.static(__dirname + '/src'));
  app.use('/docs', express.static(__dirname + '/public/docs'));
  app.use('/api.yaml', express.static(__dirname + '/api.yaml'));
  app.use('/docs/editor', express.static(__dirname + '/public/docs-editor'));
  app.use('/docs/editor/specs', express.static(__dirname + '/api.yaml'));
};
