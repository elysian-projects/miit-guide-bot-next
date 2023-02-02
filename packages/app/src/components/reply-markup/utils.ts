/**
 * Takes current item index and amount of columns and returns `true`
 * if the current index is the last in the column, `false` otherwise
 */
export const shouldBreakRow = (index: number, columns: number): boolean => {
  return (index + 1) % columns === 0;
};
