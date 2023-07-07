'use strict';

var constants = require('./constants')(),
  processor = require('./processor')();

var error = function(req, res, message, data, code) {
  if (req && res) {
    res.statusCode = code || 400;
    processor.render(req, res, {
      error: message,
      data: data
    });
    return '';
  } else {
    return message;
  }
};

exports = module.exports.GENERIC = function(req, res, errorMessage, data, code) {
  return error(req, res, errorMessage || constants.dictionary.GENERIC_ERROR, data, code);
};

exports = module.exports.UNAUTHORIZED = function(req, res) {
  return error(req, res, constants.dictionary.UNAUTHORIZED, undefined, 403);
};

exports = module.exports.INVALIDTOKEN = function(req, res) {
  return error(req, res, constants.dictionary.INVALID_TOKEN, undefined, 401);
};

exports = module.exports.EMAILNOTSENT = function(req, res) {
  return error(req, res, constants.dictionary.EMAIL_NOT_SENT);
};

exports = module.exports.IMAGEPROCESSINGERROR = function(req, res) {
  return error(req, res, constants.dictionary.IMAGE_PROCESSING_ERROR);
};

exports = module.exports.UNALLOWED = function(req, res) {
  return error(req, res, constants.dictionary.USER_IS_NOT_ADMIN, undefined, 403);
};
