'use strict';

var _ = require('underscore'),
  current, dictionary, dictionaryActions;

const Parser = class {
  constructor(name) {
    this.name = name;
    return ((params) => this.action(params));
  }
  action(param) {
    if (_.isArray(param)) {
      var result = dictionary[this.name];
      _.each(param, function(str, index) {
        if (_.isArray(str)) {
          str = str.join(', ');
        }
        result = result.replace('%s' + (index + 1), str);
      });
      return result;
    }
    return dictionary[this.name].replace('%s', param);
  }
};

exports = module.exports = function(injections) {
  if (!current) {
    current = injections.languagePack();
    console.log('LANGUAGE PACK = ' + current.language);
    dictionary = current.dictionary;
    dictionaryActions = {};
    _.each(dictionary, function(value, key) {
      dictionaryActions[key] = new Parser(key);
    });
    dictionaryActions.dictionary = dictionary;
  }
  return dictionaryActions;
};
