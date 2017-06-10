// @flow
import { get, has } from 'lodash';

export const DEFAULT_PREFIX = 'meta.vis';

const _getPrefix = (schema: SchemaType, prefix: string = DEFAULT_PREFIX) =>
  get(schema, prefix, schema);

export function getOrdinal(
  schema: SchemaType,
  prefix: string,
  defaultValue?: any
) {
  return get(_getPrefix(schema, prefix), 'ordinal', defaultValue);
}

export function hasOrdinal(schema: SchemaType, prefix: string) {
  return has(_getPrefix(schema, prefix), 'ordinal');
}

export function isEditable(
  schema: SchemaType,
  prefix: string,
  defaultValue?: any
) {
  return get(_getPrefix(schema, prefix), 'editable', defaultValue);
}

export function getComponent(
  schema: SchemaType,
  prefix: string,
  defaultValue?: any
) {
  return get(_getPrefix(schema, prefix), 'component', defaultValue);
}

export function hasComponent(schema: SchemaType, prefix: string) {
  return has(_getPrefix(schema, prefix), 'component');
}

export function getStyle(
  schema: SchemaType,
  prefix: string,
  defaultValue?: { [string]: any }
) {
  return get(_getPrefix(schema, prefix), 'style', defaultValue);
}

export function hasStyle(schema: SchemaType, prefix: string) {
  return has(_getPrefix(schema, prefix), 'style');
}
