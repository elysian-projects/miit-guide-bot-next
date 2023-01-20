import { locationImages } from "@/chat/images";
import { createReplyMarkup } from "@/components/reply-markup/replyMarkup";
import { Context } from "grammy";

export const locationChoiceHandler = async (ctx: Context): Promise<void> => {
  const markup = createReplyMarkup("inline", locationImages);
  await ctx.reply("Here's the location choice", {reply_markup: markup});
};
