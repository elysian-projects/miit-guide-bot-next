import { IResponse } from "common/dist";

export const createResponse = (params: IResponse): IResponse => {
  return {
    ...params,
  };
};
