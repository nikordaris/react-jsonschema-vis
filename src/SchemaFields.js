// @flow
import React, { Component } from 'react';
import { Field } from 'redux-form';
import { has, get, map, isString, isEmpty } from 'lodash';
import evaluateStyle from 'evaluate-style';

import {
  DEFAULT_PREFIX,
  getLabel,
  getEditable,
  getOrdinal,
  hasOrdinal,
  getWidget,
  hasWidget
} from './selectors';

function _compare(obj = {}, prefix = DEFAULT_PREFIX) {
  return (a, b) => {
    if (hasOrdinal(obj[a], prefix)) {
      if (hasOrdinal(obj[b], prefix)) {
        const aOrdinal = getOrdinal(obj[a], prefix);
        const bOrdinal = getOrdinal(obj[b], prefix);
        return aOrdinal - bOrdinal;
      }
      return 1;
    }
    if (hasOrdinal(obj[b], prefix)) {
      return -1;
    }

    const vA = getLabel(obj[a], a);
    const vB = getLabel(obj[b], b);
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
    prefix: DEFAULT_PREFIX,
    formFieldsTag: 'div'
  };

  props: {
    schema: SchemaType,
    prefix: string,
    styles: SchemaFormStylesType,
    widgets: { [string]: React.Element<*> | string },
    widgetProps: { [string]: { styles: { [string]: any } } },
    formFieldsTag: string
  };

  isSchemaEmpty(schema: SchemaType) {
    const { prefix } = this.props;
    return (
      has(schema, 'properties') &&
      isEmpty(
        map(schema.properties).filter(prop => getEditable(prop, prefix, false))
      )
    );
  }

  renderFields(schema: SchemaType, id: string, parentName?: string) {
    const { styles, formFieldsTag: FormFieldsTag, prefix } = this.props;
    const { formFields: formFieldsStyle } = evaluateStyle(styles, schema);
    const properties = schema.properties || {};
    return (
      <FormFieldsTag key={id} id={id} style={formFieldsStyle}>
        {Object.keys(properties)
          .filter(prop => getEditable(properties[prop], prefix, false))
          .sort(_compare(schema.properties, prefix))
          .map((prop, idx) =>
            this.renderField(
              properties[prop],
              idx,
              prop,
              schema.required ? schema.required.includes(prop) : false,
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
    const { styles, widgets, widgetProps, prefix } = this.props;
    const { formField: formFieldStyles } = evaluateStyle(styles, fieldSchema);
    const fieldName = namespace ? `${namespace}.${name}` : name;
    const label = getLabel(fieldSchema, prefix, name);

    if (fieldSchema.type && fieldSchema.type === 'object') {
      return this.renderFields(fieldSchema, label, fieldName);
    }

    const widget = getWidget(fieldSchema, prefix);

    if (hasWidget(fieldSchema, prefix) && has(widgets, widget)) {
      const Widget = get(widgets, widget);
      const widgetProp = evaluateStyle(
        get(widgetProps, widget, {}),
        fieldSchema
      );

      if (isString(Widget)) {
        return (
          <Widget
            styles={formFieldStyles}
            key={idx}
            name={name}
            schema={fieldSchema}
            {...widgetProp}
          />
        );
      }

      return React.cloneElement(Widget, {
        key: idx,
        styles: formFieldStyles,
        schema: fieldSchema,
        ...widgetProp
      });
    }

    return (
      <Field key={idx} label={label} name={fieldName} required={required} />
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
