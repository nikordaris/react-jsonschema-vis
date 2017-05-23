// @flow
import React, { Component } from 'react';
import { Field } from 'redux-form';
import { has, get, map, isString, isEmpty } from 'lodash';
import evaluateStyle from 'evaluate-style';

const ORDINAL_PROP = 'meta.form.ordinal';
const LABEL_PROP = 'meta.form.label';
const EDITABLE_PROP = 'meta.form.editable';
const TYPE_PROP = 'meta.form.type';
const WIDGET_PROP = 'meta.form.widget';

function _compare(obj = {}) {
  return (a, b) => {
    if (has(obj[a], ORDINAL_PROP)) {
      if (has(obj[b], ORDINAL_PROP)) {
        const aOrdinal = get(obj[a], ORDINAL_PROP);
        const bOrdinal = get(obj[b], ORDINAL_PROP);
        return aOrdinal - bOrdinal;
      }
      return 1;
    }
    if (has(obj[b], ORDINAL_PROP)) {
      return -1;
    }

    const vA = get(obj[a], LABEL_PROP) || a;
    const vB = get(obj[b], LABEL_PROP) || b;
    return +(vA > vB) || +(vA === vB) - 1;
  };
}

export type SchemaFormStylesType = {
  formFields: (
    schema: SchemaType
  ) => { [string]: string | number } | { [string]: string | number },
  formField: (
    schema: SchemaType
  ) => { [string]: string | number } | { [string]: string | number }
};

export default class SchemaForm extends Component {
  static defaultProps = {
    styles: {},
    formFieldsTag: 'div'
  };

  props: {
    schema: SchemaType,
    styles: SchemaFormStylesType,
    widgets: { [string]: React.Element<*> | string },
    formFieldsTag: string
  };

  isSchemaEmpty(schema: SchemaType) {
    return (
      has(schema, 'properties') &&
      isEmpty(map(schema.properties).filter(prop => get(prop, EDITABLE_PROP)))
    );
  }

  renderFields(schema: SchemaType, id: string, parentName?: string) {
    const { styles, formFieldsTag: FormFieldsTag } = this.props;
    const { formFields: formFieldsStyle } = evaluateStyle(styles, schema);
    return (
      <FormFieldsTag key={id} id={id} style={formFieldsStyle}>
        {map(schema.properties)
          .filter(prop => get(prop, EDITABLE_PROP))
          .sort(_compare(schema.properties))
          .map((prop, key, idx) =>
            this.renderField(
              prop,
              idx,
              key,
              schema.required ? schema.required.includes(key) : false,
              parentName
            )
          )}
      </FormFieldsTag>
    );
  }

  renderField(
    fieldSchema: SchemaType,
    idx: number | string,
    name: string,
    required: boolean,
    namespace?: string
  ) {
    const { styles, widgets } = this.props;
    const { formField: formFieldStyles } = evaluateStyle(styles, fieldSchema);
    const fieldName = namespace ? `${namespace}.${name}` : name;
    const label = get(fieldSchema, LABEL_PROP, name);

    if (fieldSchema.type && fieldSchema.type === 'object') {
      return this.renderFields(fieldSchema, label, fieldName);
    }

    const widget = get(fieldSchema, WIDGET_PROP);

    if (has(widgets, widget)) {
      const Widget = get(widgets, widget);
      if (isString(Widget)) {
        return (
          <Widget
            styles={formFieldStyles}
            key={idx}
            name={name}
            schema={fieldSchema}
          />
        );
      }

      return React.cloneElement(Widget, {
        key: idx,
        styles: formFieldStyles,
        schema: fieldSchema
      });
    }

    const type = get(fieldSchema, TYPE_PROP, 'text');

    return (
      <Field
        key={idx}
        label={label}
        name={fieldName}
        component="input"
        type={type}
        required={required}
      />
    );
  }

  render() {
    const { styles, schema, formFieldsTag: FormFieldsTag } = this.props;
    const { formFields: formFieldsStyle } = evaluateStyle(styles, schema);

    return (
      <FormFieldsTag style={formFieldsStyle}>
        {this.renderFields(schema, 'schemaForm')}
      </FormFieldsTag>
    );
  }
}
