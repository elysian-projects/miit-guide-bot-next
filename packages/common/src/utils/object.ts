export const emptyObject = (value: unknown): value is object => {
  return isObject(value) && Object.keys(value).length === 0;
};

export const isObject = (value: unknown): value is object => {
  return Boolean(value) && typeof value === "object" && Array.isArray(value) === false && value !== null;
};
