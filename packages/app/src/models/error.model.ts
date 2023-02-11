import { NO_CONTENT, NO_TG_CONNECTION } from "@/constants/messages";
import { AxiosError } from "axios";
import { GrammyError, HttpError } from "grammy";

type ErrorHandlerResponse = {
  internalMessage: string,
  externalMessage: string
}

export const getErrorData = (error: {description: string}): ErrorHandlerResponse => {
  switch(error.constructor) {
    case GrammyError: {
      return {
        internalMessage: "Error in request: " + error,
        externalMessage: "Произошла ошибка, приносим свои извинения!"
      };
    }
    case HttpError: {
      return {
        internalMessage: "Could not contact Telegram: " + error,
        externalMessage: NO_TG_CONNECTION
      };
    }
    case AxiosError: {
      return {
        internalMessage: "Axios error: " + error,
        externalMessage: NO_CONTENT
      };
    }
    default: {
      return {
        internalMessage: "Unknown error: " + error,
        externalMessage: "Неизвестная ошибка!"
      };
    }
  }
};
