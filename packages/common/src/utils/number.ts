export const isNumeric = (value: unknown): value is number => {
  return isNaN(Number(value)) === false;
};
