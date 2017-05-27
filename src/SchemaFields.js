// @flow
import React, { Component } from 'react';
import { has, get, isString } from 'lodash';
import evaluateStyle from 'evaluate-style';

import {
  DEFAULT_PREFIX,
  isEditable,
  getOrdinal,
  hasOrdinal,
  getWidget,
  hasWidget
} from './selectors';

const LABEL_PROP = 'title';

function _compare(obj: { [name: string]: any }, prefix: string) {
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

    const vA = get(obj[a], LABEL_PROP, a);
    const vB = get(obj[b], LABEL_PROP, b);
    return +(vA > vB) || +(vA === vB) - 1;
  };
}

export default class SchemaFields extends Component {
  static defaultProps = {
    styles: {},
    prefix: DEFAULT_PREFIX,
    formFieldsTag: 'div'
  };

  props: {
    schema: SchemaType,
    prefix: string,
    namespace?: string,
    styles: SchemaFormStylesType,
    widgets: { [string]: React.Element<*> | string },
    widgetProps: { [string]: { styles: { [string]: any } } },
    formFieldsTag: string
  };

  renderFields(schema: SchemaType, id: string, parentName?: string) {
    if (schema.type && schema.type !== 'object') {
      return this.renderField(schema, id, id, undefined, parentName);
    }
    const { styles, formFieldsTag: FormFieldsTag, prefix } = this.props;
    const { formFields: formFieldsStyle } = evaluateStyle(styles, schema);
    const properties = schema.properties || {};

    return (
      <FormFieldsTag key={id} id={id} style={formFieldsStyle}>
        {Object.keys(properties)
          .filter(prop => isEditable(properties[prop], prefix, false))
          .sort(_compare(properties, prefix))
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
    required: boolean = false,
    namespace?: string
  ) {
    const { styles, widgets, widgetProps, prefix } = this.props;
    const { formField: formFieldStyles } = evaluateStyle(styles, fieldSchema);
    const fieldName = namespace ? `${namespace}.${name}` : name;
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
            name={fieldName}
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

    return <div key={idx} />;
  }

  render() {
    const {
      styles,
      schema,
      namespace,
      formFieldsTag: FormFieldsTag
    } = this.props;
    const { formFields: formFieldsStyle } = evaluateStyle(styles, schema);

    return (
      <FormFieldsTag style={formFieldsStyle}>
        {this.renderFields(schema, 'schemaForm', namespace)}
      </FormFieldsTag>
    );
  }
}
