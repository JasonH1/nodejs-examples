#!/bin/env node

'use strict';

/*
 *  CORE ***
 *
 *  Author: Jason Ho 
 *  Basic Microservice 
 * 
 */

var admin = require("firebase-admin");

var serviceAccount = require("./Mypets-7c0bb9008212.json");

var jwt = require('jsonwebtoken');

var verifiedtokens = {};
var request = require('request');


var getTokenUpdateTtime = function (sessionExpire){
  var msToUpdateToken = 0,
    msToUpdateTokenDefault = 1000*60*60; // after this period we will update token

  if (sessionExpire){
    var expiresTokenDate = new Date(sessionExpire),
      now = new Date();

    msToUpdateToken = expiresTokenDate - now;
  }

  // if no expire date provided or less than 0
  // then set defaul value
  if (msToUpdateToken <= 0){
    msToUpdateToken = millisecondsToUpdateTokenDefault;
  }
  return msToUpdateToken;
}

//Use the value of max-age in the Cache-Control header of the response from that endpoint to know when to refresh the public keys.
var getVerifiedGoogleTokens = function (){
  request('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      verifiedtokens = JSON.parse(body);
    }
    setTimeout(getVerifiedGoogleTokens, getTokenUpdateTtime(response.headers.expires));
  });
}
getVerifiedGoogleTokens();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://example-1c71e.firebaseio.com"
}); 

var PROD,DEV;

const createServer = require('node-rpc-redis/src/server')
const server = createServer('redis://pub-redis-17769.us-east-1-2.1.ec2.garantiadata.com:17769?password=MyPets11@z$!sq')

// Start the microservices
require('./service/index')(server, require('./config'));

const express = require('express')
const app = express()
app.SERVER = String(process.env.SERVER_NAME || 'localhost');
app.PORT = Number(process.env.PORT || 8090);

process.argv.forEach(function(val) {
  if (val === 'prod') {
    PROD = true;
  }
  if (val === 'dev') {
    DEV = true;
  }
});

// This is client and we expose apis for testing purposes only
const createClient = require('node-rpc-redis/src/client')
const client = createClient('redis://pub-redis-17769.us-east-1-2.1.ec2.garantiadata.com:17769?password=MyPets11@z$!sq')
const _ = require('underscore');
const bodyParser = require('body-parser');

const callRoute = function(req, res) {
  const params = {
    func: req.params.service + '.' + req.params.cmd,
    data: req.query,
    user: req.user
  };
  if (req.error && req.error.length > 0) {
    res.statusCode = 401;
    res.send({
      "Error": req.error
    });
  } else {
    client.call('DEV.example.microservice', params, (callErr, result) => {
      if (callErr) {
        // handle error
        console.log('error: ', callErr);
        res.send({
          "error": callErr
        });
      } else {
        res.send(result);
      }
    });
  }
};

const callPostRoute = function(req, res) {
  const params = {
    func: req.params.service + '.' + req.params.cmd,
    data: req.body || {},
    user: req.user
  };
  if (req.error && req.error.length > 0) {
    res.statusCode = 401;
    res.send({
      "Error": req.error
    });
  } else {
    client.call('DEV.example.microservice', params, (callErr, result) => {
      if (callErr) {
        // handle error
        console.log('error: ', callErr);
        res.send({
          "error": callErr
        });
      } else {
        res.send(result);
      }
    });
  }

};


//const jwt = require('jwt-simple');
var errors;

const getToken = function(req) {
  return (req.body && req.body.access_token) ||
    (req.body && req.body.token) ||
    (req.query && req.query.access_token) ||
    (req.query && req.query.token) ||
    req.headers['x-access-token'];
};

const pCheck = function(req, res, next) {
    var token = getToken(req),
      decodedToken;

    if (token) {
      try {
        var decoded = jwt.decode(token, {
          complete: true
        });
        var now = new Date();
        if (verifiedtokens[decoded.header.kid]) {
          // First ensure its a verified token.
          // Now check if its expired.
          if (decoded.payload.exp > now.getTime() / 1000) {
            //token has not expired so lets use it
            req.user = decoded.payload;
            req.token = token;
            next();
          } else {
            req.error = "Token has expired.";
            next();
          }
        } else {
          req.error = "Token not verified.";
          next();

          // We could run a check to see if our public token key has expired by now...
          //
        }

      } catch (err) {
        req.error = "Invalid Token";
        next();
      }
    } else {
      req.error = "Unknown Error";
      next();
    }
  }
  // First connect to the Redis server
client.connect((connectionErr) => {
  if (connectionErr) {
    // Handle error and kill the process
  } else {
    console.log('mypets routing initialized...');

    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.raw({
      type: 'application/yaml'
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.json({
      type: '*/*'
    }));

    app.get('/', function(req, res) {
      res.send('exmaple microService is up')
    });

    // Comment this out in production since it has no authentication and exposes the API
    // We need an API layer and validation/authentication before it can call the service
    // Just exposing this is to allow you to test or check your code easily/quickly

    app.get('/:service/:cmd', pCheck, callRoute);

    app.post('/:service/:cmd', pCheck, callPostRoute);

    app.listen(app.PORT, () => {
      console.log('%s:%d - %s', app.SERVER, app.PORT, new Date(Date.now()));
    });
  }
});