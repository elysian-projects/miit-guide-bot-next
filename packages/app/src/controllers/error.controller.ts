import { removeInlineReplyMarkup } from "@/components/reply-markup";
import { getErrorData } from "@/models/error.model";
import { sendMessage } from "@/views/general.view";
import { BotError, Context } from "grammy";

export const errorController = async (error: BotError<Context>) => {
  const ctx = error.ctx;
  removeInlineReplyMarkup(ctx);

  const {externalMessage, internalMessage} = getErrorData(error.error as {description: string});

  console.error(internalMessage);
  await sendMessage(ctx, {
    message: externalMessage
  });
};
