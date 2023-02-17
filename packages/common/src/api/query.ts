import axios from "axios";
import { ContentNode, IResponse, TabNode } from "../types";
import { Data, SearchOptions } from "./types";
import { getOptionsString, getSelectString, getServerURL } from "./utils";

type ApiData = "articles" | "tabs";

export async function getData<T extends ApiData = "articles", K extends ContentNode = ContentNode>(type: T, options?: Partial<SearchOptions<K>>): Promise<IResponse<K[]>>;
export async function getData<T extends ApiData = "tabs", K extends TabNode = TabNode>(type: T, options?: Partial<SearchOptions<K>>): Promise<IResponse<K[]>>;
export async function getData<T extends ApiData, K extends ContentNode | TabNode>(type: T, options?: Partial<SearchOptions<K>>): Promise<IResponse<K[]>> {
  const {select, where, ...searchProps} = options ?? {};

  let query = getServerURL().concat("/api/").concat(type).concat("?");

  if(searchProps) {
    query = query.concat(getOptionsString(searchProps as Partial<SearchOptions<K>>)).concat("&");
  }

  if(where) {
    query = query.concat(getOptionsString(where)).concat("&");
  }

  if(select) {
    query = query.concat(getSelectString(select));
  }

  const {data: response} = await axios.get<IResponse<K[]>>(query, {headers: getDefaultHeaders()});

  return response;
}

export const deleteData = async (type: ApiData, id: string | number): Promise<Data> => {
  const query = getServerURL().concat("/api/").concat(type).concat("?id=").concat(`${id}`);

  const {data: response} = await axios.delete<IResponse<ContentNode>>(query, {headers: getDefaultHeaders()});

  return {
    status: response.status
  };
};

const getDefaultHeaders = () => {
  return {
    "Access-Control-Allow-Origin": getServerURL(),
    "Content-Type": "application/json"
  };
};
