// @flow
import { get, isEmpty, isFunction, isArray } from "lodash";
import {
  getOrdinal,
  hasOrdinal
} from "./selectors";

const LABEL_PROP = "title";

export function getComparator(obj: { [name: string]: any }, prefix: string) {
  return (a: string, b: string) => {
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

export function isRequired(schema: SchemaType, key: string) {
  return schema.required && schema.required.includes(key);
}

export function getDefaultComponent(defaultComponents: any, schema: any = {}) {
  if (defaultComponents && isArray(defaultComponents)) {
    const comps = defaultComponents.map(
      comp =>
        (isFunction(comp)
          ? comp(schema)
          : comp.type === schema.type && comp.component)
    ).filter(comp => comp);
    return !isEmpty(comps) && comps[0];
  } else if (defaultComponents) {
    return defaultComponents[schema.type];
  }

  return undefined;
}