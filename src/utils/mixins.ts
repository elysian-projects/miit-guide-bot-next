import { ButtonClickHandler } from "@/types/mixins";
import { Context } from "grammy";

export const buttonContextMixin = async (ctx: Context, callback: ButtonClickHandler) => {
  // This is required because the button load animation would last longer, even if the message is already sent
  await ctx.answerCallbackQuery();

  const userId = ctx.chat?.id;
  const clickData = ctx.callbackQuery?.data ?? ctx.message?.text;

  if(!userId || !clickData) {
    throw new Error("Invalid context!");
  }

  callback({
    ctx,
    userId,
    clickData
  });
};
