import * as replies from "@/constants/replies";
import { locations } from "@/env";
import { MessageHandler } from "@/types/handlers";
import { createInlineKeyboardMarkup } from "@/utils/buttons";

const start: MessageHandler = (ctx) => {
  const locationImages = Object.values(locations);

  const markup = createInlineKeyboardMarkup(locationImages);

  ctx.sendPhoto("https://rut-miit.ru/content/opengraph-image_1_1920x1280.jpg?id_wm=884159");
  ctx.sendMessage(replies.GREETINGS, {reply_markup: markup});
};

const help: MessageHandler = (ctx) => {
  ctx.sendMessage("Help message received!");
};

const messageHandler: MessageHandler = (ctx) => {
  ctx.sendMessage(`Message "${ctx.message}" received!`);
};

export {
  start,
  help,
  messageHandler
};
