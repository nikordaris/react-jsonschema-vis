// @flow
import React, { Component } from 'react';
import { get, set, merge, omit, isEmpty, isEqual } from 'lodash';

import {
  DEFAULT_PREFIX,
  isDisabled,
  getComponent,
  getStyle,
  getPrefix
} from './selectors';

import { getComparator, getDefaultComponent, isRequired } from './utils';

export default class SchemaVis extends Component {
  static defaultProps = {
    styles: {},
    prefix: DEFAULT_PREFIX,
    tag: 'div',
    id: 'schemaVis'
  };

  props: {
    schema: SchemaType,
    definitions: { [string]: SchemaType },
    id: string,
    prefix: string,
    namespace?: string,
    styles: SchemaVisStylesType,
    components: { [string]: React.Element<*> | string },
    defaultComponents: any,
    componentProps: { [string]: { styles: { [string]: any } } },
    tag: string
  };

  state: {
    definitions: { [string]: SchemaType }
  };

  componentWillMount() {
    const {
      schema: { definitions: schemaDefinitions } = {},
      definitions: propDefinitions
    } = this.props;
    this.setDefinitions(schemaDefinitions, propDefinitions);
  }

  componentWillReceiveProps(nextProps: any) {
    const {
      definitions: nextPropDefinitions,
      schema: { definitions: nextSchemaDefinitions } = {}
    } = nextProps;
    const {
      definitions: propDefinitions,
      schema: { definitions: schemaDefinitions } = {}
    } = this.props;
    if (
      !isEqual(nextPropDefinitions, propDefinitions) ||
      !isEqual(nextSchemaDefinitions, schemaDefinitions)
    ) {
      this.setDefinitions(nextSchemaDefinitions, nextPropDefinitions);
    }
  }

  setDefinitions(
    schemaDefinitions: { [string]: SchemaType } = {},
    propDefinitions: { [string]: SchemaType } = {}
  ) {
    this.setState({
      ...this.state,
      definitions: merge({}, schemaDefinitions, propDefinitions)
    });
  }

  setSchemaDefMetadata(schema: SchemaType, metadata: any) {
    const { prefix } = this.props;
    if (isEmpty(prefix)) {
      return merge({}, schema, metadata);
    }

    return set(schema, prefix, metadata);
  }

  getSchema(schema: SchemaType) {
    const { definitions } = this.state;
    const { prefix } = this.props;
    const ref = get(schema, '$ref');
    if (ref) {
      // expects #/definitions/[PATH/TO/DEF]
      const refDot = ref.slice(14).replace('/', '.');
      const refSchema = get(definitions, refDot);
      return (
        refSchema &&
        this.setSchemaDefMetadata(
          refSchema,
          merge(
            {},
            getPrefix(omit(schema, ['$ref']), prefix),
            getPrefix(refSchema, prefix)
          )
        )
      );
    }
    return schema;
  }

  renderChildren = (schema: SchemaType, namespace?: string) => {
    const { prefix } = this.props;
    const children = schema.type === 'object' && schema.properties
      ? schema.properties
      : {};
    return Object.keys(children)
      .filter(prop => !isDisabled(children[prop], prefix))
      .sort(getComparator(children, prefix))
      .map((prop, idx) =>
        this.renderSchema(
          children[prop],
          idx,
          namespace ? `${namespace}.${prop}` : prop,
          isRequired(schema, prop)
        )
      );
  };

  renderSchema = (
    schema: SchemaType,
    idx: number | string,
    name?: string,
    required: boolean = false
  ) => {
    const {
      styles: { component: componentStyles = {} },
      components,
      componentProps,
      prefix,
      tag: Tag,
      defaultComponents
    } = this.props;
    const schemaDef = this.getSchema(schema);
    const schemaStyle = getStyle(schemaDef, prefix, {});
    const component = getComponent(schemaDef, prefix);
    const rest = omit(this.props, [
      'schema',
      'prefix',
      'styles',
      'namespace',
      'components',
      'componentProps',
      'defaultComponents',
      'tag'
    ]);

    const ComponentVis = get(
      components,
      component,
      getDefaultComponent(defaultComponents, schemaDef)
    );

    if (ComponentVis) {
      const { styles: componentPropStyles = {}, ...componentProp } = get(
        componentProps,
        component,
        {}
      );

      const componentAttributes = {
        styles: merge({}, componentStyles, componentPropStyles, schemaStyle),
        key: idx,
        name,
        required,
        schemaVis: {
          prefix,
          schema: schemaDef,
          components,
          componentProps,
          defaultComponents
        },
        ...componentProp,
        ...rest
      };

      if (React.isValidElement(ComponentVis)) {
        return React.cloneElement(ComponentVis, componentAttributes);
      }

      return React.createElement(ComponentVis, componentAttributes);
    } else if (!isEmpty(get(schemaDef, 'properties', {}))) {
      return React.createElement(
        Tag,
        { key: idx, ...rest },
        this.renderChildren(schemaDef, name)
      );
    }

    return undefined;
  };

  render() {
    const { schema, namespace, id } = this.props;

    return this.renderSchema(schema, id, namespace) || <div />;
  }
}
