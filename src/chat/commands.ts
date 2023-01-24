import { createReplyMarkup, removeMenuReplyMarkup } from "@/components/reply-markup";
import { getChatId, removeUserFromStores } from "@/utils/common";
import { Context } from "grammy";
import { GREETINGS, MAIN_HUB_PHOTO, UNKNOWN_COMMAND } from "./constants";
import { tabImages } from "./images";

export const onStart = async (ctx: Context) => {
  const chatId = getChatId(ctx);

  // TODO: rewrite when server is ready
  const markup = createReplyMarkup("inline", tabImages);

  removeUserFromStores(chatId);

  // Separate caption and photo into different messages to be able to remove the menu keyboard
  await ctx.replyWithPhoto(MAIN_HUB_PHOTO, {reply_markup: removeMenuReplyMarkup()});
  await ctx.reply(GREETINGS, {reply_markup: markup});
};

export const onHelp = async (ctx: Context) => {
  await ctx.reply("Help message");
};

export const onUnknown = async (ctx: Context) => {
  await ctx.reply(UNKNOWN_COMMAND);
};
