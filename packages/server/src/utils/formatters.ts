// TODO: find a way not to separate words and set gaps in spaces
export const normalizeContent = (data: string): string[] => {
  if(data.length === 0) {
    return [];
  }

  return (data.match(/.{1,800}/g) ?? []).map((item, index, array) => (index !== array.length - 1) ? item + "..." : item);
};
