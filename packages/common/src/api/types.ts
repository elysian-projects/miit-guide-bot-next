import { ContentNode } from "../types";

export type ApiSearchNode = {
  registry: string,
  key: string,
  value: string
}

export type SearchOptions<T extends object = object> = {
  where?: Partial<T>,
  select?: string[],
  orderBy?: string,
  page?: number | null,
  take?: number | null,
  search?: ApiSearchNode | null
}

export type Data = {
  status: number,
  content?: ContentNode[]
}

export enum HTTPMethods {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete"
}

export type ApiData = "articles" | "articles/reorder" | "tabs" | "auth/login" | "auth/logout" | "auth/signup" | "search";
