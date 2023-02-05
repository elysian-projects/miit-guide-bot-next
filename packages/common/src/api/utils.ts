import { SearchOptions } from "./types";

export const getServerURL = (): string => {
  const PROTOCOL = (process.env.HTTPS === "true") ? "https" : "http";
  const HOST = process.env.SERVER_HOST || "localhost";
  const PORT = process.env.SERVER_PORT || "5000";

  if(!PROTOCOL || !HOST || !PORT) {
    throw new Error("Couldn't load `.env` config!");
  }

  return `${PROTOCOL}://${HOST}:${PORT}`;
};

export const getSelectString = (select: string[]): string => {
  return select.reduce((acc, current) => {
    const currentSelectProp = `select[]=${current}`;

    if(acc.length === 0) {
      return currentSelectProp;
    }

    return `${acc}&${currentSelectProp}`;
  }, "");
};

export const getOptionsString = (options: Partial<SearchOptions>): string => {
  if(!options || Object.keys(options).length === 0) {
    return "";
  }

  return Object.keys(options).reduce((previousValue, currentKey) => (
    previousValue + currentKey + "=" + options[currentKey as keyof typeof options]
  ), "");
};
