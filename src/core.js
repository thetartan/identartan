'use strict';

var _ = require('./utils');
var md5 = require('md5-o-matic');

var defaultOptions = {
  colors: [], // Palette entries
  maxWidth: 121, // Max width in threads
  multiplier: 2 // Scale for each stripe
};

function chooseColors(hash, colors) {
  var result = [];
  var palette = [];
  var i;
  var n;

  // Choose palette
  var count = parseInt(hash.charAt(0), 16) % 3 + 3; // 3..5 colors
  for (i = 1; i <= count; i++) {
    n = parseInt(hash.charAt(i), 16) % colors.length;
    palette.push(colors[n]);
    colors.splice(n, 1);
  }

  // Generate color sequence
  var last = -1;
  for (i = hash.length - 1; i >= 0; i--) {
    n = parseInt(hash[i], 16) % palette.length;
    if (n != last) {
      result.push(palette[n]);
      last = n;
    }
  }
  if (result.length < 2) {
    [].push.apply(result, palette);
  }

  return result;
}

function chooseStripes(hash, options) {
  var result = [];
  // at least three stripes
  var count = parseInt(hash.charAt(0), 16) % 13 + 3;
  var i;
  for (i = 1; i < hash.length; i++) {
    var stripe = parseInt(hash.charAt(i), 16) + 1;
    if (result.length == count) {
      result[i % count] ^= stripe;
    } else {
      result.push(stripe);
    }
  }

  // Fix zero-width stripes
  hash = hash.replace(/0/g, '') + '1';
  for (i = 0; i < result.length; i++) {
    if (result[i] == 0) {
      var j = i % hash.length;
      result[i] = parseInt(hash.charAt(j), 16);
    }
  }

  if (options.maxWidth > 31) {
    var sum = 0;
    for (i = 0; i < result.length; i++) {
      sum += result[i];
      if (sum >= options.maxWidth) {
        result.splice(i, result.length);
        break;
      }
    }
  }

  if (result.length == 1) {
    result.push(result[0]);
  }

  return result;
}

function merge(stripes, colors, options) {
  var result = [];
  var i;
  var last = stripes.length - 1;

  for (i = 0; i <= last; i++) {
    var color = colors[i % colors.length];
    var count = stripes[i] * options.multiplier;
    result.push({
      name: color,
      count: count,
      isPivot: (i == 0) || (i == last)
    });
  }

  return result;
}

function generate(string, options) {
  options = _.extend({}, defaultOptions, options);

  var hash = md5(string);
  var colors = options.colors;
  if (!_.isArray(colors)) {
    if (_.isObject(colors)) {
      colors = _.keys(colors);
    } else {
      colors = [];
    }
  }

  if (colors.length < 2) {
    return [];
  }

  return merge(chooseStripes(hash, options),
    chooseColors(hash, colors), options);
}

module.exports.generate = generate;
