// @flow
import React, { Component } from "react";
import { get, merge, omit, isEmpty } from "lodash";

import {
  DEFAULT_PREFIX,
  isDisabled,
  getComponent,
  getStyle
} from "./selectors";

import { getComparator, getDefaultComponent, isRequired } from './utils';

export default class SchemaVis extends Component {
  static defaultProps = {
    styles: {},
    prefix: DEFAULT_PREFIX,
    tag: "div",
    id: "schemaVis"
  };

  props: {
    schema: SchemaType,
    id: string,
    prefix: string,
    namespace?: string,
    styles: SchemaVisStylesType,
    components: { [string]: React.Element<*> | string
},
defaultComponents: any,
  componentProps: { [string]: { styles: { [string]: any } } },
tag: string
  };

renderChildren = (schema: SchemaType, namespace?: string) => {
  const { prefix } = this.props;
  const children = schema.type === "object" && schema.properties
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

  const schemaStyle = getStyle(schema, prefix, {});
  const component = getComponent(schema, prefix);
  const rest = omit(this.props, [
    "schema",
    "prefix",
    "styles",
    "namespace",
    "components",
    "componentProps",
    "defaultComponents",
    "tag"
  ]);

  const ComponentVis = get(
    components,
    component,
    getDefaultComponent(defaultComponents, schema)
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
        schema,
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
  } else if (!isEmpty(get(schema, "properties", {}))) {
    return React.createElement(
      Tag,
      { key: idx, ...rest },
      this.renderChildren(schema, name)
    );
  }

  return undefined;
};

render() {
  const { schema, namespace, id } = this.props;

  return this.renderSchema(schema, id, namespace) || <div />;
}
}
