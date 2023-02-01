import { imageAdapter } from "@/adapters/images";
import { GREETINGS, MAIN_HUB_PHOTO, UNKNOWN_COMMAND } from "@/chat/constants";
import { locationButton } from "@/chat/images";
import { createReplyMarkup, removeMenuReplyMarkup } from "@/components/reply-markup";
import { Image } from "@/types/lib";
import { IResponse } from "@/types/server";
import { ChatId } from "@/types/user";
import { removeUserFromStores } from "@/utils/common";
import { getApiURL } from "@/utils/server";
import { sendMessage, sendPhoto } from "@/views/general.view";
import axios from "axios";
import { Context } from "grammy";

export const startCommandModel = async (ctx: Context, chatId: ChatId) => {
  // User must be deleted before we start processing commands to avoid problems
  // with concurrent existence in the menu and in the article-reading state
  removeUserFromStores(chatId);

  const {data: response} = await axios.get<IResponse>(`${getApiURL()}/tabs?type=article`);
  const replyMarkup = createReplyMarkup("inline", [locationButton, ...imageAdapter(response.data as Image[] ?? [])]);

  // Separate caption and photo into different messages to be able to remove the menu keyboard
  await sendPhoto(ctx, {
    photo: MAIN_HUB_PHOTO,
    reply_markup: removeMenuReplyMarkup()
  });
  await sendMessage(ctx, {
    message: GREETINGS,
    reply_markup: replyMarkup
  });
};

export const helpCommandModel = async (ctx: Context) => {
  await sendMessage(ctx, {
    message: "Help message"
  });
};

export const unknownCommandModel = async (ctx: Context) => {
  await sendMessage(ctx, {
    message: UNKNOWN_COMMAND
  });
};
