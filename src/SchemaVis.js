// @flow
import React, { Component } from 'react';
import { has, get, isString, merge, omit } from 'lodash';
import evaluateStyle from 'evaluate-style';

import {
  DEFAULT_PREFIX,
  isEditable,
  getOrdinal,
  hasOrdinal,
  getComponent,
  hasComponent
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

function isRequired(schema: SchemaType, prop: SchemaType, key: string) {
  const required = Array.isArray(schema.required)
    ? schema.required.includes(key)
    : schema.required;
  return required || Array.isArray(prop.required) ? false : !!prop.required;
}

export default class SchemaVis extends Component {
  static defaultProps = {
    styles: {},
    prefix: DEFAULT_PREFIX,
    tag: 'div'
  };

  props: {
    schema: SchemaType,
    prefix: string,
    namespace?: string,
    styles: SchemaVisStylesType,
    components: { [string]: React.Element<*> | string },
    componentProps: { [string]: { styles: { [string]: any } } },
    tag: string
  };

  renderChildren(schema: SchemaType, namespace?: string) {
    const { prefix } = this.props;
    const children = schema.type === 'object' && schema.properties
      ? schema.properties
      : {};
    return Object.keys(children)
      .filter(prop => isEditable(children[prop], prefix, false))
      .sort(_compare(children, prefix))
      .map((prop, idx) =>
        this.renderSchema(
          children[prop],
          idx,
          prop,
          isRequired(schema, children[prop], prop),
          namespace
        )
      );
  }

  renderSchema(
    schema: SchemaType,
    idx: number | string,
    name?: string,
    required: boolean = false,
    namespace?: string
  ) {
    const { styles, components, componentProps, prefix, tag: Tag } = this.props;
    const {
      component: componentStyles = {},
      components: componentsStyles = {}
    } = evaluateStyle(styles, schema);
    const componentName = namespace && name ? `${namespace}.${name}` : name;
    const component = getComponent(schema, prefix);
    const rest = omit(this.props, [
      'schema',
      'prefix',
      'styles',
      'components',
      'componentProps',
      'tag'
    ]);

    if (hasComponent(schema, prefix) && has(components, component)) {
      const ComponentVis = get(components, component);
      let { styles: componentPropStyles = {}, ...componentProp } = get(
        componentProps,
        component,
        {}
      );
      componentPropStyles = evaluateStyle(componentPropStyles, {
        schema,
        name,
        required,
        namespace
      });
      const componentAttributes = {
        style: merge(componentStyles, componentPropStyles),
        key: idx,
        name: componentName,
        schema,
        required,
        ...componentProp,
        ...rest
      };

      if (isString(ComponentVis)) {
        return (
          <ComponentVis {...componentAttributes}>
            {this.renderChildren(schema, componentName)}
          </ComponentVis>
        );
      }

      return React.cloneElement(
        ComponentVis,
        componentAttributes,
        this.renderChildren(schema, componentName)
      );
    }

    return (
      <Tag key={idx} style={componentsStyles} {...componentProps} {...rest}>
        {this.renderChildren(schema, componentName)}
      </Tag>
    );
  }

  render() {
    const { schema, namespace } = this.props;

    return this.renderSchema(schema, 'schemaVis', namespace);
  }
}
