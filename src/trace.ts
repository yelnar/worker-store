type TAny = {
  [key: string]: any
}

type TBoolean = {
  [key: string]: boolean
}

/**
 * Iterates through object keys and strictly compares values.
 * @param current
 * @param previous
 * @returns object with keys from current and optional boolean values.
 */
export function trace<T extends TAny>(current: T, previous: T): TBoolean {
  return Object.keys(current).reduce(
    (delta, key) =>
      current[key] !== previous[key]
        ? {
            ...delta,
            [key]: true,
          }
        : delta,
    {}
  )
}
