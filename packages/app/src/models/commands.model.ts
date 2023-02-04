import { isValidImage } from "@/adapters/images";
import { IResponse } from "@/common";
import { createReplyMarkup, removeMenuReplyMarkup } from "@/components/reply-markup";
import { locationButton } from "@/constants/controls";
import { GREETINGS, MAIN_HUB_PHOTO, UNKNOWN_COMMAND } from "@/constants/messages";
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

  if(!isValidImage(response.data)) {
    throw new Error("Invalid data!");
  }

  const replyMarkup = createReplyMarkup("inline", [locationButton, ...response.data]);

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
