// @flow

declare type SchemaMetaType = {
  form: {
    editable: boolean,
    ordinal: number,
    label: string,
    widget: string
  }
};
declare type SchemaType = {
  id?: string,
  $schema?: string,
  title?: string,
  description?: string,
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
  required?: string[],
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
  not?: SchemaType,
  meta: SchemaMetaType
};
