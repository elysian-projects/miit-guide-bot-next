import { IResponse } from "@/common";

export const createResponse = (params: IResponse): IResponse => {
  return {
    ...params,
  };
};
