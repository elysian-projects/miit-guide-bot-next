export const getValidSelectArray = <T extends object>(select: unknown, sampleObject: T): (keyof T)[] => {
  if(!select || !Array.isArray(select)) {
    return [];
  }

  const keys = Object.keys(sampleObject);

  return select.filter(item => keys.includes(item));
};
