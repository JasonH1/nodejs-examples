#!/bin/env node

/*
 *  Author: Jason Ho 2015
 *  SIK Search NodeJS API
 */

'use strict';

var async = require('async'),
  express = require('express'),
  app = express(),
  processor,
  es,
  errors,
  authorization,
  PROD = process.env.PROD || false,
  DEV = process.env.DEV || false;

app.SERVER = String(process.env.SERVER_NAME || 'localhost');
app.PORT = Number(process.env.PORT || 8085);
app.PROD = PROD;

process.argv.forEach(function(val) {
  if (val === 'prod') {
    PROD = true;
  }
  if (val === 'dev') {
    DEV = true;
  }
});

if (PROD) {
  console.log('Running PROD server...');
  process.env.CURRENT_ENV = 'PROD';
} else if (DEV) {
  console.log('Running DEV server...');
  process.env.CURRENT_ENV = 'DEV';
} else {
  console.log('Running TEST server...');
  process.env.CURRENT_ENV = 'TEST';
}

app.SERVER_PATH = 'http://' + app.SERVER + ':' + app.PORT;
process.env.SERVER_PATH = app.SERVER_PATH;
console.log('SERVER_PATH = ' + app.SERVER_PATH);

// setup constants
require('./app/constants')({
  languagePack: require('./app/languages/english')
});

// setup processors
processor = require('./app/processor')(require('./app/processors/'));
es = require('./app/es').ElasticSearch,
errors = require('./app/errors');
authorization = require('./app/authorization')();

// setup config
require('./config')(app);
// setup router
require('./app/routes')(app, { processor: processor, errors: errors, db: es, authorization: authorization });


app.listen(app.PORT, () => {
  console.log('%s:%d - %s', app.SERVER, app.PORT, new Date(Date.now()));
});

/*  ================================================================  */
/*  Helper functions.                                                 */
/*  ================================================================  */

/**
 *  terminator === the termination handler
 *  Terminate server on receipt of the specified signal.
 *  @param {string} sig  Signal to terminate on.
 */
var terminator = function(sig) {
  if (typeof sig === 'string') {
    console.log('%s: Received %s - terminating sample app ...', Date(Date.now()), sig);
    process.exit(1);
  }
  console.log('%s: Node server stopped.', Date(Date.now()));
};


/**
 *  Setup termination handlers (for exit and a list of signals).
 */
var setupTerminationHandlers = function() {
  //  Process on exit and signals.
  process.on('exit', function() {
    terminator();
  });

  // Removed 'SIGPIPE' from the list - bugz 852598.
  ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
    'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
  ].forEach((element, index, array) => {
    process.on(element, () => {
      terminator(element);
    });
  });
};

setupTerminationHandlers();
