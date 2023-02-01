import { removeInlineReplyMarkup } from "@/components/reply-markup";
import { NO_CONTENT, NO_TG_CONNECTION } from "@/constants/messages";
import { sendMessage } from "@/views/general.view";
import { AxiosError } from "axios";
import { Context, GrammyError, HttpError } from "grammy";

export const errorModel = async (ctx: Context, error: {description: string}) => {
  removeInlineReplyMarkup(ctx);

  switch(error.constructor) {
    // Appears when there is a problem on the client side and the Telegram server could not process the response
    case GrammyError: {
      console.error("Error in request:", error.description);
      await sendMessage(ctx, {message: "Произошла ошибка, приносим свои извинения!"});
      break;
    }

    // Appears when the Telegram servers are not available or failed to connect, this might be due to
    // loss of internet connection or any other network reasons. The problem is, this cannot be processed properly
    case HttpError: {
      console.error("Could not contact Telegram:", error);
      await sendMessage(ctx, {message: NO_TG_CONNECTION});
      break;
    }

    // Appear when our server sends a response with status different from `2**` or doesn't respond at all,
    // in this case the data cannot be fetched or there is just nothing to fetch (empty response with `404` status code)
    case AxiosError: {
      console.error("Axios error:", error);
      await sendMessage(ctx, {message: NO_CONTENT});
      break;
    }

    // Any other kind of error
    default: {
      console.error("Unknown error:", error);
      await sendMessage(ctx, {message: "Неизвестная ошибка!"});
      break;
    }
  }
};
