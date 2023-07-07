'use strict';

var authorization;

exports = module.exports = function(app, injections) {
  app.get('/', function(req, res) {
    res.send('SAB Search API v2.0 is alive');
  });
  authorization = injections.authorization;
  injections.PROD = app.PROD;

  app.get('/config', [require('./config').get]);

  // New search routes....
  app.get('/:service', [injections.authorization.check, require('./controller')(injections).Get]);
  app.get('/:service/:feed', [injections.authorization.check, require('./controller')(injections).Get]);
  app.get('/:service/:index/:id', [injections.authorization.check, require('./controller')(injections).Get]);
};
