import { IResponse } from "@/types";

export const createResponse = (params: IResponse): IResponse => {
  return {
    ...params,
  };
};
