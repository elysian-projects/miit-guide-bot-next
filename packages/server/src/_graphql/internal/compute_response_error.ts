import { TypeORMError } from "typeorm";
import { INTERNAL_SERVER_ERROR_MESSAGE } from "./constants";

export const computeResponseError = (error: unknown): Error => {
  console.log(error);

  if(error instanceof TypeORMError) {
    return new Error(INTERNAL_SERVER_ERROR_MESSAGE);
  }

  return error as Error;
};
