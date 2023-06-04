import { GraphQLError } from "graphql";
import { QueryFailedError } from "typeorm";
import { INTERNAL_SERVER_ERROR_MESSAGE } from "./constants";

export const computeResponseError = (error: unknown): Error => {
  console.log(error);

  if(error instanceof QueryFailedError || error instanceof Error === false) {
    return new GraphQLError(INTERNAL_SERVER_ERROR_MESSAGE);
  }

  return error as Error;
};
