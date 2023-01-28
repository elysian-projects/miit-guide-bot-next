export const isValidTabBody = <T extends {type: string, label: string}>(body: T): boolean => {
  return (!body.label || !body.type || (body.type !== "location" && body.type !== "article")) === false;
};

export const isValidId = (id: unknown): boolean => {
  return (!id && isNaN(Number(id))) === false;
};
