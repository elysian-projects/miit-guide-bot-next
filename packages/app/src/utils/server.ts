export const getApiURL = (): string => {
  return `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api`;
};
