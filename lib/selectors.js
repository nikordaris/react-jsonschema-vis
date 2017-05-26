'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PREFIX = undefined;
exports.getOrdinal = getOrdinal;
exports.hasOrdinal = hasOrdinal;
exports.isEditable = isEditable;
exports.getWidget = getWidget;
exports.hasWidget = hasWidget;

var _lodash = require('lodash');

var DEFAULT_PREFIX = exports.DEFAULT_PREFIX = 'meta.form';

var _getPrefix = function _getPrefix(schema) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PREFIX;
  return (0, _lodash.get)(schema, prefix, schema);
};

function getOrdinal(schema, prefix, defaultValue) {
  return (0, _lodash.get)(_getPrefix(schema, prefix), 'ordinal', defaultValue);
}

function hasOrdinal(schema, prefix) {
  return (0, _lodash.has)(_getPrefix(schema, prefix), 'ordinal');
}

function isEditable(schema, prefix, defaultValue) {
  return (0, _lodash.get)(_getPrefix(schema, prefix), 'editable', defaultValue);
}

function getWidget(schema, prefix, defaultValue) {
  return (0, _lodash.get)(_getPrefix(schema, prefix), 'widget', defaultValue);
}

function hasWidget(schema, prefix) {
  return (0, _lodash.has)(_getPrefix(schema, prefix), 'widget');
}