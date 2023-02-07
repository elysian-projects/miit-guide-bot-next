import axios from "axios";
import { ContentNode, IResponse } from "../types";
import { Data, SearchOptions } from "./types";
import { getOptionsString, getSelectString, getServerURL } from "./utils";

type ApiData = "articles" | "tabs";

export const getData = async <T extends object>(type: ApiData, options?: Partial<SearchOptions>): Promise<IResponse<T>> => {
  const {select, ...searchProps} = options ?? {};

  let query = getServerURL().concat("/api/").concat(type).concat("?");

  if(searchProps) {
    query = query.concat(getOptionsString(searchProps));
  }

  if(select) {
    query = query.concat(getSelectString(select));
  }

  const {data: response} = await axios.get<IResponse<T>>(query, {headers: {
    "Access-Control-Allow-Origin": getServerURL(),
    "Content-Type": "application/json"
  }});

  return response;
};

export const deleteData = async (type: ApiData, id: string | number): Promise<Data> => {
  const query = getServerURL().concat("/api/").concat(type).concat("?id=").concat(`${id}`);

  const {data: response} = await axios.delete<IResponse<ContentNode>>(query, {headers: {
    "Access-Control-Allow-Origin": getServerURL(),
    "Content-Type": "application/json"
  }});

  return {
    status: response.status
  };
};
