import axios from "axios";
import { ContentNode, IResponse } from "../types";

type SearchOptions = {
  [key in keyof ContentNode]: string
}

type Data = {
  status: number,
  content?: ContentNode[]
}

type ApiData = "articles" | "locations";

export const getData = async (type: ApiData, options?: SearchOptions): Promise<Data> => {
  let query = getServerURL().concat("/api/").concat(type);

  if(options) {
    query += getOptionsString(options);
  }

  const {data: response} = await axios.get<IResponse<ContentNode>>(query, {headers: {
    "Access-Control-Allow-Origin": getServerURL(),
    "Content-Type": "application/json"
  }});

  return {
    status: response.status,
    content: response.data ?? []
  };
};

export const getServerURL = (): string => {
  const PROTOCOL = process.env.SERVER_PROTOCOL;
  const HOST = process.env.SERVER_HOST;
  const PORT = process.env.SERVER_PORT;

  if(!PROTOCOL || !HOST || !PORT) {
    throw new Error("Couldn't load `.env` config!");
  }

  return `${PROTOCOL}:${HOST}:${PORT}`;
};

export const getOptionsString = (options: SearchOptions): string => {
  if(Object.keys(options).length === 0) {
    return "";
  }

  return Object.keys(options).reduce((previousValue, currentKey) => {
    return previousValue + currentKey + options[currentKey as keyof typeof options];
  }, "");
};
