export interface IResponse<T extends object = object> {
  status: number,
  ok: boolean,
  message?: string,
  data?: T[]
}
