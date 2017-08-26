// @flow
import { get, has } from "lodash";

export const DEFAULT_PREFIX = "meta.vis";

export const getPrefix = (
  schema: SchemaType,
  prefix: string = DEFAULT_PREFIX
) => get(schema, prefix, schema);

export function getOrdinal(
  schema: SchemaType,
  prefix: string,
  defaultValue?: any
) {
  return get(getPrefix(schema, prefix), "ordinal", defaultValue);
}

export function hasOrdinal(schema: SchemaType, prefix: string) {
  return has(getPrefix(schema, prefix), "ordinal");
}

export function isDisabled(schema: SchemaType, prefix: string) {
  return get(getPrefix(schema, prefix), "disable", false);
}

export function getComponent(
  schema: SchemaType,
  prefix: string,
  defaultValue?: any
) {
  return get(getPrefix(schema, prefix), "component", defaultValue);
}

export function hasComponent(schema: SchemaType, prefix: string) {
  return has(getPrefix(schema, prefix), "component");
}

export function getStyle(
  schema: SchemaType,
  prefix: string,
  defaultValue?: { [string]: any }
) {
  return get(getPrefix(schema, prefix), "style", defaultValue);
}

export function hasStyle(schema: SchemaType, prefix: string) {
  return has(getPrefix(schema, prefix), "style");
}
