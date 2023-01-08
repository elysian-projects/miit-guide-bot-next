import * as replies from "@/constants/replies";
import { storeController, tabsImage } from "@/env";
import { MessageHandler } from "@/types/lib";
import { createKeyboard } from "@/utils/keyboard";

export const start: MessageHandler = async (ctx) => {
  if(!ctx.chat || !ctx.chat.id) {
    throw new Error("Cannot identify chat id!");
  }

  // Remove user from the list to avoid unexpected bugs
  storeController.removeUser(ctx.chat.id);

  const markup = createKeyboard("inline", tabsImage, {oneTime: true});

  // Separate caption and photo into different messages to be able to remove the menu keyboard
  await ctx.replyWithPhoto("https://rut-miit.ru/content/opengraph-image_1_1920x1280.jpg?id_wm=884159", {reply_markup: {remove_keyboard: true}});
  await ctx.reply(replies.GREETINGS, {reply_markup: markup});
};
