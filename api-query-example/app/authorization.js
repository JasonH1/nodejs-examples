"use strict";

var jwt = require('jwt-simple'),
  errors;

var getToken = function(req) {
  return (req.body && req.body.access_token) ||
    (req.body && req.body.token) ||
    (req.query && req.query.access_token) ||
    (req.query && req.query.token) ||
    req.headers['x-access-token'];
};

// check without throwing errors
var pCheck = function(req, res, next) {
  var token = getToken(req),
    decodedToken;

  if (token) {
    try {
      decodedToken = jwt.decode(token, req.app.get('jwtTokenSecret'));
      if (decodedToken.id) {
        req.user = decodedToken;
        req.token = token;
      }
      next();
    } catch (err) {
      next();
    }
  } else {
    next();
  }
}

exports = module.exports = function(injectors) {
  return {
    check: pCheck
  }
};