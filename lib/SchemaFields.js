'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _lodash = require('lodash');

var _evaluateStyle4 = require('evaluate-style');

var _evaluateStyle5 = _interopRequireDefault(_evaluateStyle4);

var _selectors = require('./selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LABEL_PROP = 'title';

function _compare() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _selectors.DEFAULT_PREFIX;

  return function (a, b) {
    if ((0, _selectors.hasOrdinal)(obj[a], prefix)) {
      if ((0, _selectors.hasOrdinal)(obj[b], prefix)) {
        var aOrdinal = (0, _selectors.getOrdinal)(obj[a], prefix);
        var bOrdinal = (0, _selectors.getOrdinal)(obj[b], prefix);
        return aOrdinal - bOrdinal;
      }
      return 1;
    }
    if ((0, _selectors.hasOrdinal)(obj[b], prefix)) {
      return -1;
    }

    var vA = (0, _lodash.get)(obj[a], LABEL_PROP, a);
    var vB = (0, _lodash.get)(obj[b], LABEL_PROP, b);
    return +(vA > vB) || +(vA === vB) - 1;
  };
}

var SchemaFields = function (_Component) {
  _inherits(SchemaFields, _Component);

  function SchemaFields() {
    _classCallCheck(this, SchemaFields);

    return _possibleConstructorReturn(this, (SchemaFields.__proto__ || Object.getPrototypeOf(SchemaFields)).apply(this, arguments));
  }

  _createClass(SchemaFields, [{
    key: 'renderFields',
    value: function renderFields(schema, id, parentName) {
      var _this2 = this;

      var _props = this.props,
          styles = _props.styles,
          FormFieldsTag = _props.formFieldsTag,
          prefix = _props.prefix;

      var _evaluateStyle = (0, _evaluateStyle5.default)(styles, schema),
          formFieldsStyle = _evaluateStyle.formFields;

      var properties = schema.properties || {};
      return _react2.default.createElement(
        FormFieldsTag,
        { key: id, id: id, style: formFieldsStyle },
        Object.keys(properties).filter(function (prop) {
          return (0, _selectors.isEditable)(properties[prop], prefix, false);
        }).sort(_compare(schema.properties, prefix)).map(function (prop, idx) {
          return _this2.renderField(properties[prop], idx, prop, schema.required ? schema.required.includes(prop) : false, parentName);
        })
      );
    }
  }, {
    key: 'renderField',
    value: function renderField(fieldSchema, idx, name, required, namespace) {
      var _props2 = this.props,
          styles = _props2.styles,
          widgets = _props2.widgets,
          widgetProps = _props2.widgetProps,
          prefix = _props2.prefix;

      var _evaluateStyle2 = (0, _evaluateStyle5.default)(styles, fieldSchema),
          formFieldStyles = _evaluateStyle2.formField;

      var fieldName = namespace ? namespace + '.' + name : name;
      var label = (0, _lodash.get)(fieldSchema, LABEL_PROP, name);

      if (fieldSchema.type && fieldSchema.type === 'object') {
        return this.renderFields(fieldSchema, label, fieldName);
      }

      var widget = (0, _selectors.getWidget)(fieldSchema, prefix);

      if ((0, _selectors.hasWidget)(fieldSchema, prefix) && (0, _lodash.has)(widgets, widget)) {
        var Widget = (0, _lodash.get)(widgets, widget);
        var widgetProp = (0, _evaluateStyle5.default)((0, _lodash.get)(widgetProps, widget, {}), fieldSchema);

        if ((0, _lodash.isString)(Widget)) {
          return _react2.default.createElement(Widget, _extends({
            styles: formFieldStyles,
            key: idx,
            name: name,
            schema: fieldSchema
          }, widgetProp));
        }

        return _react2.default.cloneElement(Widget, _extends({
          key: idx,
          styles: formFieldStyles,
          schema: fieldSchema
        }, widgetProp));
      }

      return _react2.default.createElement(_reduxForm.Field, { key: idx, label: label, name: fieldName, required: required });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          styles = _props3.styles,
          schema = _props3.schema,
          FormFieldsTag = _props3.formFieldsTag;

      var _evaluateStyle3 = (0, _evaluateStyle5.default)(styles, schema),
          formFieldsStyle = _evaluateStyle3.formFields;

      return _react2.default.createElement(
        FormFieldsTag,
        { style: formFieldsStyle },
        this.renderFields(schema, 'schemaForm')
      );
    }
  }]);

  return SchemaFields;
}(_react.Component);

SchemaFields.defaultProps = {
  styles: {},
  prefix: _selectors.DEFAULT_PREFIX,
  formFieldsTag: 'div'
};
exports.default = SchemaFields;