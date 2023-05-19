export const getSearchProps = (fieldName: string, valueLike: unknown): object => {
  if(!valueLike || typeof valueLike !== "string") {
    return {};
  }

  return {
    [fieldName]: `%${valueLike}%`
  };
};
