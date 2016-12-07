'use strict';

var _ = require('./utils');
var tartan = require('tartan');
var core = require('./core');

/*
  options = {
    // + default options for core
    transformSyntaxTree: <default>
  }
*/

function buildTree(tokens) {
  var items = _.map(tokens, function(token) {
    return tartan.utils.node.newStripe(token);
  });
  var isReflected = (tokens.length >= 2) && (tokens[0].isPivot);
  return tartan.utils.node.newRootBlock(items, isReflected);
}

function factory(options) {
  options = _.extend({}, options);

  return function(source) {
    var result = {};
    result.colors = tartan.utils.color.buildColorMap([]);
    result.warp = result.weft = buildTree(core.generate(source, options));
    if (_.isFunction(options.transformSyntaxTree)) {
      result = options.transformSyntaxTree(result);
    }
    return result;
  };
}

module.exports = factory;
