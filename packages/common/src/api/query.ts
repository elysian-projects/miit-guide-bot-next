import axios from "axios";
import { ContentNode, ContentType, IResponse } from "../types";
import { emptyObject } from "../utils/object";
import { emptyString } from "../utils/string";
import { ApiData, Data, HTTPMethods, SearchOptions } from "./types";
import { getOptionsString, getSelectString, getServerURL } from "./utils";

export class ServerQuery {
  public getAll = async <T extends ContentType>(type: ApiData, options: SearchOptions<T>): Promise<IResponse<T[]>> => {
    const query = new QueryBuilder().assembleQueryURI(type, options).query;

    return await axios<IResponse<T[]>>({
      method: HTTPMethods.GET,
      url: query,
      headers: getDefaultHeaders()
    })
    .then(({data: response}) => {
      return response;
    })
    .catch(error => {
      logError(error);
      return this.getResponseOnError(error) as IResponse<T[]>;
    });
  };

  public getOne = async <T extends ContentType>(type: ApiData, options: SearchOptions<T>): Promise<IResponse<T>> => {
    const query = new QueryBuilder().assembleQueryURI(type, options).query;

    return await axios<IResponse<T>>({
      method: HTTPMethods.GET,
      url: query,
      headers: getDefaultHeaders()
    })
    .then(({data: response}) => {
      return {
        ...response,
        data: Array.isArray(response.data) ? response.data[0] : {}
      };
    })
    .catch(error => {
      logError(error);
      return this.getResponseOnError(error) as IResponse<T>;
    });
  };

  public insert = async <T extends object>(type: ApiData, data: object): Promise<IResponse<T>> => {
    const query = new QueryBuilder().assembleQueryURI(type).query;

    return await axios<IResponse<T>>({
      method: HTTPMethods.POST,
      url: query,
      data,
      headers: getDefaultHeaders()
    })
    .then(({data: response}) => {
      return response;
    })
    .catch(error => {
      logError(error);
      return this.getResponseOnError(error) as IResponse<T>;
    });
  };

  public update = async <T extends object>(type: ApiData, data: T): Promise<IResponse<T>> => {
    const query = new QueryBuilder().assembleQueryURI(type).query;

    return await axios<IResponse<T>>({
      method: HTTPMethods.PUT,
      url: query,
      data,
      headers: getDefaultHeaders()
    })
    .then(({data: response}) => {
      return {
        ok: response.ok,
        status: response.status,
        message: response.message
      };
    })
    .catch(error => {
      logError(error);
      return this.getResponseOnError(error) as IResponse<T>;
    });
  };

  public delete = async <T extends object, K extends {id: string | number}>(type: ApiData, data: K): Promise<IResponse<T>> => {
    const {id} = data;
    const query = new QueryBuilder().assembleQueryURI(type, {where: {id}}).query;

    return await axios<IResponse<T>>({
      method: HTTPMethods.DELETE,
      url: query,
      data,
      headers: getDefaultHeaders()
    })
    .then(({data: response}) => {
      return {
        ok: response.ok,
        status: response.status,
        message: response.message
      };
    })
    .catch(error => {
      logError(error);
      return this.getResponseOnError(error) as IResponse<T>;
    });
  };

  private getResponseOnError = (error: any): IResponse => {
    return {
      ok: false,
      status: error.response.data.status || 400,
      message: error.response.message || "Произошла неизвестная ошибка!"
    };
  };
}

class QueryBuilder {
  private static SERVER_API_URI: string = getServerURL() + "/api/";

  private _query;

  public constructor() {
    this._query = QueryBuilder.SERVER_API_URI;
  }

  public get query(): string {
    return this._query;
  }

  public assembleQueryURI = (type: ApiData, options?: SearchOptions): this => {
    const {select, where, page, take, orderBy} = options ?? {};

    this.concatString(type);
    this.concatObject(where || {});
    this.concatObject(select || {});
    this.concatObject(page ? {page} : {});
    this.concatObject(page && take ? {take} : {});
    this.concatObject(orderBy ? {orderBy} : {});

    return this;
  };

  private concatObject = (value: object): void => {
    if(emptyObject(value)) {
      return;
    }

    this.concatServiceChar();
    this._query = this._query.concat(getOptionsString(value));
  };

  private concatString = (value: string): void => {
    if(emptyString(value)) {
      return;
    }

    this._query = this._query.concat(value);
  };

  private concatServiceChar = (): void => {
    if(this.hasProperServiceChar()) {
      return;
    }

    this._query = (this._query.includes("?"))
      ? this._query.concat("&")
      : this._query.concat("?");
  };

  private hasProperServiceChar = (): boolean => {
    return this._query.endsWith("?") || this._query.endsWith("&");
  };
}

/**
 * @deprecated - use `ServerQuery` instead
 */
export async function getData<T extends ApiData>(type: T, options?: Partial<SearchOptions<object>>): Promise<IResponse<object[]>> {
  const {select, where, page, take, ...searchProps} = options ?? {};

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

  if(page) {
    query = query.concat(`&page=${page}`);
  }

  if(page && take) {
    query = query.concat(`&take=${take}`);
  }

  const {data: response} = await axios<IResponse<object[]>>({
    method: "get",
    url: query,
    headers: getDefaultHeaders()
  });

  return response;
}

/**
 * @deprecated - use `ServerQuery` instead
 */
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

/**
 * @deprecated - use `ServerQuery` instead
 */
export const updateData = async (type: ApiData, data: object): Promise<boolean> => {
  const query = getServerURL().concat("/api/").concat(type);

  const {data: responseData} = await axios.put<IResponse<object[]>>(query, data);

  return responseData.ok;
};

/**
 * @deprecated - use `ServerQuery` instead
 */
export const deleteData = async (type: ApiData, id: number | string, data?: object): Promise<Data> => {
  const query = getServerURL().concat("/api/").concat(type).concat("?id=").concat(`${id}`);

  const {data: response} = await axios.delete<IResponse<ContentNode>>(query, {data, headers: getDefaultHeaders()});

  return {
    status: response.status
  };
};

const logError = (error: any) => {
  if(process.env.NODE_ENV !== "production") {
    console.log("Error: ", error);
  }
};

const getDefaultHeaders = () => {
  return {
    "Content-Type": "application/json"
  };
};
