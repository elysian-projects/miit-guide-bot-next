export const emptyString = (value: unknown): boolean => {
  return typeof value === "string" && value.trim().length === 0;
};
