import { imageAdapter } from "@/adapters/images";
import { createReplyMarkup, removeMenuReplyMarkup } from "@/components/reply-markup";
import { PostgreSQL } from "@/database/postgresql";
import { getChatId, removeUserFromStores } from "@/utils/common";
import { Context } from "grammy";
import { GREETINGS, MAIN_HUB_PHOTO, UNKNOWN_COMMAND } from "./constants";
import { locationButton } from "./images";

export const onStart = async (ctx: Context) => {
  const chatId = getChatId(ctx);
  const data = await new PostgreSQL().query("SELECT * FROM tabs WHERE tab_type = 'article'");

  removeUserFromStores(chatId);

  const replyMarkup = createReplyMarkup("inline", [locationButton, ...imageAdapter(data.rows)]);

  // Separate caption and photo into different messages to be able to remove the menu keyboard
  await ctx.replyWithPhoto(MAIN_HUB_PHOTO, {reply_markup: removeMenuReplyMarkup()});
  await ctx.reply(GREETINGS, {reply_markup: replyMarkup});
};

export const onHelp = async (ctx: Context) => {
  await ctx.reply("Help message");
};

export const onUnknown = async (ctx: Context) => {
  await ctx.reply(UNKNOWN_COMMAND);
};
