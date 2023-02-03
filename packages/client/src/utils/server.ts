import axios from "axios";
import { ContentNode, IResponse } from "../../../common/src";
import { Data } from "../types";

type SearchOptions = {
  [key in keyof ContentNode]: string
}

export const getData = async (type: "articles" | "locations", options?: SearchOptions): Promise<Data> => {
  let query = `http://192.168.0.95:5000/api/${type}`;

  if(options) {
    query += getOptionsString(options);
  }

  const {data: response} = await axios.get<IResponse>(query, {headers: {
    "Access-Control-Allow-Origin": "http://192.168.0.95:5000",
    "Content-Type": "application/json"
  }});

  return {
    status: response.status,
    content: response.data as ContentNode[] ?? []
  }
}

const getOptionsString = (options: SearchOptions): string => {
  if(Object.keys(options).length === 0) {
    return "";
  }

  return Object.keys(options).reduce((previousValue, currentKey) => {
    return previousValue + currentKey + options[currentKey as keyof typeof options]
  }, "");
}
