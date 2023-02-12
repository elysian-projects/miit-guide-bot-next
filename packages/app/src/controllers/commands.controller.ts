import { createReplyMarkup, removeMenuReplyMarkup } from "@/components/reply-markup";
import { locationButton } from "@/constants/controls";
import { MAIN_HUB_PHOTO, UNKNOWN_COMMAND } from "@/constants/messages";
import { getIntroData } from "@/models/commands.model";
import { getChatId, removeUserFromStores } from "@/utils/common";
import { sendMessage, sendPhoto } from "@/views/general.view";
import { Context } from "grammy";

export const onStart = async (ctx: Context) => {
  removeUserFromStores(getChatId(ctx));

  const {message, tabs} = await getIntroData();
  const replyMarkup = createReplyMarkup("inline", [locationButton, ...tabs], {columns: 1});

  await sendPhoto(ctx, {
    photo: MAIN_HUB_PHOTO,
    reply_markup: removeMenuReplyMarkup()
  });
  await sendMessage(ctx, {
    message,
    reply_markup: replyMarkup
  });
};

export const onHelp = async (ctx: Context) => {
  await sendMessage(ctx, {
    message: "Help message"
  });
};

export const onUnknown = async (ctx: Context) => {
  await sendMessage(ctx, {
    message: UNKNOWN_COMMAND
  });
};
