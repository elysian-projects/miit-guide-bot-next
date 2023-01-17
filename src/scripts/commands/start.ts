import { rootMenu } from "@/bootstrap";
import { GREETINGS } from "@/constants/replies";
import { MessageHandler } from "@/types/lib";
import { getChatId, removeUserFromStores } from "@/utils/common";

export const start: MessageHandler = async (ctx) => {
  const chatId = getChatId(ctx);

  removeUserFromStores(chatId);

  // Separate caption and photo into different messages to be able to remove the menu keyboard
  await ctx.replyWithPhoto("https://rut-miit.ru/content/opengraph-image_1_1920x1280.jpg?id_wm=884159", {reply_markup: {remove_keyboard: true}});
  await ctx.reply(GREETINGS, {reply_markup: rootMenu});
};
