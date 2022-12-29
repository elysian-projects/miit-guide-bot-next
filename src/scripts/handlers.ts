import * as replies from "@/constants/replies";
import { tabs } from "@/env";
import { InlineButtonClickHandler, MessageHandler } from "@/types/lib";
import { createKeyboard } from "@/utils/keyboard";
import { createButtonsFromTabs } from "@/utils/tabs";

const start: MessageHandler = async (ctx) => {
  const markup = createKeyboard("inline", createButtonsFromTabs(tabs), {oneTime: true});

  ctx.replyWithPhoto("https://rut-miit.ru/content/opengraph-image_1_1920x1280.jpg?id_wm=884159", {caption: replies.GREETINGS, reply_markup: markup});
};

const help: MessageHandler = (ctx) => {
  ctx.reply("Help message received!");
};

const messageHandler: MessageHandler = (ctx) => {
  ctx.reply(`Message "${ctx.message}" received!`);
};

const inlineButtonClickHandler: InlineButtonClickHandler = (ctx) => {
  console.log(ctx.callbackQuery?.data);
  ctx.reply(`Inline button clicked: ${ctx}`);
};

export {
  start,
  help,
  messageHandler,
  inlineButtonClickHandler
};
