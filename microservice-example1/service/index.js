'use strict';

// Add services here
// We duplicating code within services so we can easily split them out
// later.  JH

const Listings = require('./listings/index').Listings;

exports = module.exports = function(server, config) {
  console.log(config);
  // First connect to the Redis server
  server.connect((connectionErr) => {
    if (connectionErr) {
      // Handle error and kill the process
      console.log('Something went wrong could not connect to microservice communication redis channel');
    } else {
      // Handle a call from a remote service

      // Service IDL
      server.handle(config.env + '.mypets.microservice', (params, cb) => {
        console.log('microservice: ', params.func);
        switch (params.func) {
          case 'listings.add':
            Listings.add(params, cb);
            break;
          case 'listings.list':
            Listings.list(params, cb);
            break;
          case 'listings.status':
            Listings.status(params, cb);
            break;
          case 'listings.get':
            Listings.get(params, cb);
            break;
          case 'listings.delall':
            Listings.delall(params, cb);
            break;
            
        }
      });
    }
  });

};