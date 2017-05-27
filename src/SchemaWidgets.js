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

export default class SchemaWidgets extends Component {
  static defaultProps = {
    styles: {},
    prefix: DEFAULT_PREFIX,
    widgetsTag: 'div'
  };

  props: {
    schema: SchemaType,
    prefix: string,
    namespace?: string,
    styles: SchemaWidgetsStylesType,
    widgets: { [string]: React.Element<*> | string },
    widgetProps: { [string]: { styles: { [string]: any } } },
    widgetsTag: string
  };

  renderWidgets(schema: SchemaType, id: string, parentName?: string) {
    if (schema.type && schema.type !== 'object') {
      return this.renderWidget(schema, id, id, undefined, parentName);
    }
    const { styles, widgetsTag: WidgetsTag, prefix } = this.props;
    const { widgets: widgetsStyle } = evaluateStyle(styles, schema);
    const properties = schema.properties || {};

    return (
      <WidgetsTag key={id} id={id} style={widgetsStyle}>
        {Object.keys(properties)
          .filter(prop => isEditable(properties[prop], prefix, false))
          .sort(_compare(properties, prefix))
          .map((prop, idx) =>
            this.renderWidget(
              properties[prop],
              idx,
              prop,
              schema.required ? schema.required.includes(prop) : properties[prop].required,
              parentName
            )
          )}
      </WidgetsTag>
    );
  }

  renderWidget(
    widgetSchema: SchemaType,
    idx: number | string,
    name: string,
    required: boolean = false,
    namespace?: string
  ) {
    const { styles, widgets, widgetProps, prefix } = this.props;
    const { widget: widgetStyles } = evaluateStyle(styles, widgetSchema);
    const widgetName = namespace ? `${namespace}.${name}` : name;
    const widget = getWidget(widgetSchema, prefix);

    if (hasWidget(widgetSchema, prefix) && has(widgets, widget)) {
      const Widget = get(widgets, widget);
      const widgetProp = evaluateStyle(
        get(widgetProps, widget, {}),
        widgetSchema
      );

      if (isString(Widget)) {
        return (
          <Widget
            styles={widgetStyles}
            key={idx}
            name={widgetName}
            schema={widgetSchema}
            {...widgetProp}
          />
        );
      }

      return React.cloneElement(Widget, {
        key: idx,
        styles: widgetStyles,
        schema: widgetSchema,
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
      widgetsTag: WidgetsTag
    } = this.props;
    const { widgets: widgetsStyle } = evaluateStyle(styles, schema);

    return (
      <WidgetsTag style={widgetsStyle}>
        {this.renderWidgets(schema, 'schemaWidgets', namespace)}
      </WidgetsTag>
    );
  }
}
