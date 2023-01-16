import * as replies from "@/constants/replies";
import { MessageHandler } from "@/types/lib";
import { getChatId, removeUserFromStores } from "@/utils/common";
import { rootMenu } from "../handlers/menus";
// import { rootMenu } from "../handlers/menus";

export const start: MessageHandler = async (ctx) => {
  const chatId = getChatId(ctx);

  removeUserFromStores(chatId);

  // const markup = createKeyboard("inline", TabsController.getImages(), {oneTime: true});

  // Separate caption and photo into different messages to be able to remove the menu keyboard
  await ctx.replyWithPhoto("https://rut-miit.ru/content/opengraph-image_1_1920x1280.jpg?id_wm=884159", {reply_markup: {remove_keyboard: true}});
  await ctx.reply(replies.GREETINGS, {reply_markup: rootMenu});
};
