'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PREFIX = undefined;
exports.getLabel = getLabel;
exports.hasLabel = hasLabel;
exports.getOrdinal = getOrdinal;
exports.hasOrdinal = hasOrdinal;
exports.getEditable = getEditable;
exports.hasEditable = hasEditable;
exports.getWidget = getWidget;
exports.hasWidget = hasWidget;

var _lodash = require('lodash');

var DEFAULT_PREFIX = exports.DEFAULT_PREFIX = 'meta.form';

function getLabel(schema, defaultValue) {
  return (0, _lodash.get)(schema, 'title', defaultValue);
}

function hasLabel(schema) {
  return (0, _lodash.has)(schema, 'title');
}

function getOrdinal(schema) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PREFIX;
  var defaultValue = arguments[2];

  return (0, _lodash.get)(schema, prefix + '.ordinal', defaultValue);
}

function hasOrdinal(schema) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PREFIX;

  return (0, _lodash.has)(schema, prefix + '.ordinal');
}

function getEditable(schema) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PREFIX;
  var defaultValue = arguments[2];

  return (0, _lodash.get)(schema, prefix + '.editable', defaultValue);
}

function hasEditable(schema) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PREFIX;

  return (0, _lodash.has)(schema, prefix + '.editable');
}

function getWidget(schema) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PREFIX;
  var defaultValue = arguments[2];

  return (0, _lodash.get)(schema, prefix + '.widget', defaultValue);
}

function hasWidget(schema) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PREFIX;

  return (0, _lodash.has)(schema, prefix + '.widget');
}