'use strict';

exports = module.exports.render = function(req, res, object) {
  res.send(JSON.stringify(object));
};
