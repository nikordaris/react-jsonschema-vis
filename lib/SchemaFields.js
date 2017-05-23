'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _lodash = require('lodash');

var _evaluateStyle4 = require('evaluate-style');

var _evaluateStyle5 = _interopRequireDefault(_evaluateStyle4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ORDINAL_PROP = 'meta.form.ordinal';
var LABEL_PROP = 'meta.form.label';
var EDITABLE_PROP = 'meta.form.editable';
var TYPE_PROP = 'meta.form.type';
var WIDGET_PROP = 'meta.form.widget';

function _compare() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (a, b) {
    if ((0, _lodash.has)(obj[a], ORDINAL_PROP)) {
      if ((0, _lodash.has)(obj[b], ORDINAL_PROP)) {
        var aOrdinal = (0, _lodash.get)(obj[a], ORDINAL_PROP);
        var bOrdinal = (0, _lodash.get)(obj[b], ORDINAL_PROP);
        return aOrdinal - bOrdinal;
      }
      return 1;
    }
    if ((0, _lodash.has)(obj[b], ORDINAL_PROP)) {
      return -1;
    }

    var vA = (0, _lodash.get)(obj[a], LABEL_PROP) || a;
    var vB = (0, _lodash.get)(obj[b], LABEL_PROP) || b;
    return +(vA > vB) || +(vA === vB) - 1;
  };
}

var SchemaForm = function (_Component) {
  _inherits(SchemaForm, _Component);

  function SchemaForm() {
    _classCallCheck(this, SchemaForm);

    return _possibleConstructorReturn(this, (SchemaForm.__proto__ || Object.getPrototypeOf(SchemaForm)).apply(this, arguments));
  }

  _createClass(SchemaForm, [{
    key: 'isSchemaEmpty',
    value: function isSchemaEmpty(schema) {
      return (0, _lodash.has)(schema, 'properties') && (0, _lodash.isEmpty)((0, _lodash.map)(schema.properties).filter(function (prop) {
        return (0, _lodash.get)(prop, EDITABLE_PROP);
      }));
    }
  }, {
    key: 'renderFields',
    value: function renderFields(schema, id, parentName) {
      var _this2 = this;

      var _props = this.props,
          styles = _props.styles,
          FormFieldsTag = _props.formFieldsTag;

      var _evaluateStyle = (0, _evaluateStyle5.default)(styles, schema),
          formFieldsStyle = _evaluateStyle.formFields;

      return _react2.default.createElement(
        FormFieldsTag,
        { key: id, id: id, style: formFieldsStyle },
        (0, _lodash.map)(schema.properties).filter(function (prop) {
          return (0, _lodash.get)(prop, EDITABLE_PROP);
        }).sort(_compare(schema.properties)).map(function (prop, key, idx) {
          return _this2.renderField(prop, idx, key, schema.required ? schema.required.includes(key) : false, parentName);
        })
      );
    }
  }, {
    key: 'renderField',
    value: function renderField(fieldSchema, idx, name, required, namespace) {
      var _props2 = this.props,
          styles = _props2.styles,
          widgets = _props2.widgets;

      var _evaluateStyle2 = (0, _evaluateStyle5.default)(styles, fieldSchema),
          formFieldStyles = _evaluateStyle2.formField;

      var fieldName = namespace ? namespace + '.' + name : name;
      var label = (0, _lodash.get)(fieldSchema, LABEL_PROP, name);

      if (fieldSchema.type && fieldSchema.type === 'object') {
        return this.renderFields(fieldSchema, label, fieldName);
      }

      var widget = (0, _lodash.get)(fieldSchema, WIDGET_PROP);

      if ((0, _lodash.has)(widgets, widget)) {
        var Widget = (0, _lodash.get)(widgets, widget);
        if ((0, _lodash.isString)(Widget)) {
          return _react2.default.createElement(Widget, {
            styles: formFieldStyles,
            key: idx,
            name: name,
            schema: fieldSchema
          });
        }

        return _react2.default.cloneElement(Widget, {
          key: idx,
          styles: formFieldStyles,
          schema: fieldSchema
        });
      }

      var type = (0, _lodash.get)(fieldSchema, TYPE_PROP, 'text');

      return _react2.default.createElement(_reduxForm.Field, {
        key: idx,
        label: label,
        name: fieldName,
        component: 'input',
        type: type,
        required: required
      });
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

  return SchemaForm;
}(_react.Component);

SchemaForm.defaultProps = {
  styles: {},
  formFieldsTag: 'div'
};
exports.default = SchemaForm;