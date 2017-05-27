// @flow
import { get, has } from 'lodash';

export const DEFAULT_PREFIX = 'meta.widgets';

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

export function getWidget(
  schema: SchemaType,
  prefix: string,
  defaultValue?: any
) {
  return get(_getPrefix(schema, prefix), 'widget', defaultValue);
}

export function hasWidget(schema: SchemaType, prefix: string) {
  return has(_getPrefix(schema, prefix), 'widget');
}
