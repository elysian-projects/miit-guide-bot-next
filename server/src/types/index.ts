import { Handler } from "express";

export interface IResponse {
  status: number,
  ok: boolean,
  message?: string,
  data?: object
}

export type Controller = {[key in string]: Handler}
