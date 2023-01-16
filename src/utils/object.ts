/**
 * Deeply compare two objects
 * @param {object} a
 * @param {object} b
 * @return {boolean}
 */
export const equalObjects = (a: object, b: object): boolean => {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  for (const key of Object.keys(a)) {
    const valueA = a[key as keyof typeof a];
    const valueB = b[key as keyof typeof b];

    const areObjects = isObject(valueA) && isObject(valueB);

    if (
      areObjects === true  && equalObjects(valueA, valueB) === false ||
      areObjects === false && valueA !== valueB
    ) {
      return false;
    }
  }

  return true;
};

export const isObject = (object: object): boolean => {
  return object != null && typeof object === "object";
};
