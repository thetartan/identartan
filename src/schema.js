'use strict';

var tartan = require('tartan');

module.exports.id = 'identartan';
module.exports.name = 'IdenTartan';
module.exports.parse = require('./parse');
module.exports.format = require('./format');
module.exports.colors = tartan.defaults.colors;
module.exports.warpAndWeftSeparator = tartan.defaults.warpAndWeftSeparator;
