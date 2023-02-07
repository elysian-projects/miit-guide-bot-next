/**
 * Returns a random integer value from the given range
 * @param {number} start inclusive
 * @param {number} end inclusive
 */
export const getRandomInt = (start: number, end: number): number => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

export const getRandomId = () => {
  return getRandomInt(0, 10000);
};
