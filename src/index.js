'use strict';

var _ = require('./utils');
var core = require('./core');
var packageInfo = require('./@package');

var tartan = null;
try {
  tartan = require('tartan');
} catch (e) {
  tartan = null;
}

if (tartan) {
  tartan.schema.identartan = _.extend(require('./schema'), packageInfo);
  module.exports = packageInfo;
} else {
  module.exports = function(string, options) {
    return _.join(_.map(core.generate(string, options), function(item) {
      return item.isPivot ?
        item.name + '/' + item.count :
        item.name + item.count;
    }), ' ');
  };
  _.extend(module.exports, packageInfo);
}
