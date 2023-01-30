import { imageAdapter } from "@/adapters/images";
import { createReplyMarkup, removeMenuReplyMarkup } from "@/components/reply-markup";
import { Image } from "@/types/lib";
import { IResponse } from "@/types/server";
import { getChatId, removeUserFromStores } from "@/utils/common";
import { getApiURL } from "@/utils/server";
import axios from "axios";
import { Context } from "grammy";
import { GREETINGS, MAIN_HUB_PHOTO, UNKNOWN_COMMAND } from "./constants";
import { locationButton } from "./images";

export const onStart = async (ctx: Context) => {
  const chatId = getChatId(ctx);

  const {data: response} = await axios.get<IResponse>(`${getApiURL()}/tabs?type=article`);

  // FIXME: This will probably never happen because the bot panics before this error is sent, maybe it should just be removed?
  if(!response.ok || !response.data) {
    throw new Error(response.message ?? "Error fetching data!");
  }

  removeUserFromStores(chatId);

  const replyMarkup = createReplyMarkup("inline", [locationButton, ...imageAdapter(response.data as Image[])]);

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
