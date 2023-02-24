import axios from "axios";
import { ContentNode, IResponse } from "../types";
import { Data, SearchOptions } from "./types";
import { getOptionsString, getSelectString, getServerURL } from "./utils";

type ApiData = "articles" | "tabs";

export async function getData<T extends ApiData>(type: T, options?: Partial<SearchOptions<object>>): Promise<IResponse<object[]>> {
  const {select, where, ...searchProps} = options ?? {};

  let query = getServerURL().concat("/api/").concat(type).concat("?");

  if(searchProps) {
    query = query.concat(getOptionsString(searchProps as Partial<SearchOptions<object>>)).concat("&");
  }

  if(where) {
    query = query.concat(getOptionsString(where)).concat("&");
  }

  if(select) {
    query = query.concat(getSelectString(select));
  }

  const {data: response} = await axios.get<IResponse<object[]>>(query, {headers: getDefaultHeaders()});

  return response;
}

export const updateData = async (type: ApiData, data: object): Promise<boolean> => {
  const query = getServerURL().concat("/api/").concat(type);

  const {data: responseData} = await axios.put<IResponse<object[]>>(query, data);

  return responseData.ok;
};

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
