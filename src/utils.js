'use strict';

var MAX_SAFE_INTEGER = 9007199254740991;

function identity(value) {
  return value;
}

var toString = Object.prototype.toString;

// string
var tagString = '[object String]';

// function
var tagAsync = '[object AsyncFunction]';
var tagFunction = '[object Function]';
var tagGenerator = '[object GeneratorFunction]';
var tagProxy = '[object Proxy]';

var reTrim = /^\s+|\s+$/g;

function isLength(value) {
  return (  // it should be...
    (typeof value == 'number') &&  // ...a number
    (value > -1) &&  // ...non-negative
    (value % 1 == 0) &&  // ...integer
    (value <= MAX_SAFE_INTEGER)  // ...within some reasonable bounds
  );
}

function isUndefined(value) {
  return typeof value == 'undefined';
}

function isNull(value) {
  return value === null;
}

function isString(value) {
  return (typeof value == 'string') ||
    (toString.call(value) == tagString);
}

function isFunction(value) {
  var tag = toString.call(value);
  return (tag == tagAsync) || (tag == tagFunction) ||
    (tag == tagGenerator) || (tag == tagProxy);
}

function isArray(value) {
  return isObject(value) && isLength(value.length) && !isFunction(value);
}

function isObject(value) {
  return (value !== null) && (typeof value == 'object');
}

function join(array, separator) {
  if ((array === undefined) || (array === null)) {
    return '';
  }
  return Array.prototype.join.call(array, separator);
}

function trim(value) {
  if (isString(value)) {
    return value.replace(reTrim, '');
  }
}

function keys(value) {
  if (isObject(value)) {
    return Object.keys(value);
  }
  return [];
}

function map(array, iteratee) {
  if (isArray(array)) {
    iteratee = isFunction(iteratee) ? iteratee : identity;
    return Array.prototype.map.call(array, iteratee, null);
  }
  return [];
}

function assign(object, source) {
  return Object.assign.apply(null, arguments);
}

module.exports.isUndefined = isUndefined;
module.exports.isNull = isNull;
module.exports.isString = isString;
module.exports.isFunction = isFunction;
module.exports.isArray = isArray;
module.exports.isObject = isObject;
module.exports.join = join;
module.exports.trim = trim;
module.exports.keys = keys;
module.exports.map = map;

module.exports.assign = assign;
module.exports.extend = assign; // alias
