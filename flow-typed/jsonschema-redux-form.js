// @flow

declare type SchemaType = {
  id?: string,
  $schema?: string,
  title?: string,
  description?: string,
  "const"?: string,
  multipleOf?: number,
  maximum?: number,
  exclusiveMaximum?: boolean,
  minimum?: number,
  exclusiveMinimum?: boolean,
  maxLength?: number,
  minLength?: number,
  pattern?: string,
  additionalItems?: boolean | SchemaType,
  items?: SchemaType | SchemaType[],
  maxItems?: number,
  minItems?: number,
  uniqueItems?: boolean,
  maxProperties?: number,
  minProperties?: number,
  required?: string[] | boolean,
  additionalProperties?: boolean | SchemaType,
  definitions?: {
    [name: string]: SchemaType
  },
  properties?: {
    [name: string]: SchemaType
  },
  patternProperties?: {
    [name: string]: SchemaType
  },
  dependencies?: {
    [name: string]: SchemaType | string[]
  },
  "enum"?: any[],
  type?: string | string[],
  allOf?: SchemaType[],
  anyOf?: SchemaType[],
  oneOf?: SchemaType[],
  not?: SchemaType
};

declare type SchemaWidgetsStylesType = {
  widgets: (
    schema: SchemaType
  ) => { [string]: string | number } | { [string]: string | number },
  widget: (
    schema: SchemaType
  ) => { [string]: string | number } | { [string]: string | number }
};

declare module 'jsonschema-redux-form' {
  declare module.exports: {
    SchemaType: SchemaType,
    SchemaWidgetsStylesType: SchemaWidgetsStylesType,
    getOrdinal(
      schema: SchemaType,
      prefix?: string,
      defaultValue?: any
    ): number,
    getEditable(
      schema: SchemaType,
      prefix?: string,
      defaultValue?: any
    ): boolean,
    getWidget(
      schema: SchemaType,
      prefix?: string,
      defaultValue?: any
    ): string
  };
}
