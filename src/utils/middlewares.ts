import { ButtonClickHandler } from "@/types/mixins";
import { Context } from "grammy";
import { getChatId } from "./common";

/**
 * @deprecated
 */
export const buttonContextMiddleware = async (ctx: Context, callback: ButtonClickHandler) => {
  // This is required because the button load animation would last longer, even if the message is already sent
  if(ctx.callbackQuery) {
    await ctx.answerCallbackQuery();
  }

  const userId = getChatId(ctx);
  const clickData = ctx.callbackQuery?.data ?? ctx.message?.text;

  if(!clickData) {
    throw new Error("Invalid context!");
  }

  callback({
    ctx,
    userId,
    clickData
  });
};
