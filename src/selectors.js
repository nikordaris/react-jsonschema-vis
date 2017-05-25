import { get, has } from 'lodash';

export const DEFAULT_PREFIX = 'meta.form';

export function getLabel(schema, defaultValue) {
  return get(schema, 'title', defaultValue);
}

export function hasLabel(schema) {
  return has(schema, 'title');
}

export function getOrdinal(schema, prefix = DEFAULT_PREFIX, defaultValue) {
  return get(schema, `${prefix}.ordinal`, defaultValue);
}

export function hasOrdinal(schema, prefix = DEFAULT_PREFIX) {
  return has(schema, `${prefix}.ordinal`);
}

export function getEditable(schema, prefix = DEFAULT_PREFIX, defaultValue) {
  return get(schema, `${prefix}.editable`, defaultValue);
}

export function hasEditable(schema, prefix = DEFAULT_PREFIX) {
  return has(schema, `${prefix}.editable`);
}

export function getWidget(schema, prefix = DEFAULT_PREFIX, defaultValue) {
  return get(schema, `${prefix}.widget`, defaultValue);
}

export function hasWidget(schema, prefix = DEFAULT_PREFIX) {
  return has(schema, `${prefix}.widget`);
}
