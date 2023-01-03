import * as replies from "@/constants/replies";
import { storeController, tabs } from "@/env";
import { MessageHandler } from "@/types/lib";
import { createKeyboard } from "@/utils/keyboard";
import { createButtonImages } from "@/utils/tabs";

export const start: MessageHandler = async (ctx) => {
  if(!ctx.chat || !ctx.chat.id) {
    throw new Error("Cannot identify chat id!");
  }

  // Remove user from the list
  if(storeController.userExists(ctx.chat.id)) {
    storeController.removeUser(ctx.chat.id);
  }

  const markup = createKeyboard("inline", createButtonImages(tabs), {oneTime: true});

  ctx.replyWithPhoto("https://rut-miit.ru/content/opengraph-image_1_1920x1280.jpg?id_wm=884159", {caption: replies.GREETINGS, reply_markup: markup});
};
