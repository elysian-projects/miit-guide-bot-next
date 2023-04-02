export const filterSearch = <T extends any[]>(array: T, callback: (value: T[number]) => boolean) => {
  const updatedArray = [];

  for(const value of array) {
    if(callback(value)) {
      updatedArray.push(value);
    }
  }

  return updatedArray;
};
