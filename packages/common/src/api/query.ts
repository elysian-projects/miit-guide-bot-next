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

  const {data: response} = await axios<IResponse<object[]>>({
    method: "get",
    url: query,
    headers: getDefaultHeaders()
  });

  return response;
}

export const createData = async (type: ApiData, data: object): Promise<{ok: boolean, message: string}> => {
  const query = getServerURL().concat("/api/").concat(type);

  try {
    const {data: responseData} = await axios.post<IResponse>(query, data);
    return {
      ok: responseData.ok,
      message: responseData.message || ""
    };
  } catch (error: any) {
    return {
      ok: error.response.data.ok,
      message: error.response.data.message || ""
    };
  }
};

export const updateData = async (type: ApiData, data: object): Promise<boolean> => {
  const query = getServerURL().concat("/api/").concat(type);

  const {data: responseData} = await axios.put<IResponse<object[]>>(query, data);

  return responseData.ok;
};

export const deleteData = async (type: ApiData, id: number | string, data?: object): Promise<Data> => {
  const query = getServerURL().concat("/api/").concat(type).concat("?id=").concat(`${id}`);

  const {data: response} = await axios.delete<IResponse<ContentNode>>(query, {data, headers: getDefaultHeaders()});

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
