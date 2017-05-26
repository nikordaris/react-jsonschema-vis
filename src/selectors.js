import { get, has } from 'lodash';

export const DEFAULT_PREFIX = 'meta.form';

const _getPrefix = (schema, prefix = DEFAULT_PREFIX) =>
  get(schema, prefix, schema);

export function getOrdinal(schema, prefix, defaultValue) {
  return get(_getPrefix(schema, prefix), 'ordinal', defaultValue);
}

export function hasOrdinal(schema, prefix) {
  return has(_getPrefix(schema, prefix), 'ordinal');
}

export function isEditable(schema, prefix, defaultValue) {
  return get(_getPrefix(schema, prefix), 'editable', defaultValue);
}

export function getWidget(schema, prefix, defaultValue) {
  return get(_getPrefix(schema, prefix), 'widget', defaultValue);
}

export function hasWidget(schema, prefix) {
  return has(_getPrefix(schema, prefix), 'widget');
}
