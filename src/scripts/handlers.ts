import * as replies from "@/constants/replies";
import { StoreController } from "@/controllers/storeController";
import { tabs } from "@/env";
import { ControlButtons, MessageHandler } from "@/types/lib";
import { LocationList } from "@/types/location";
import { TabName } from "@/types/tabs";
import { createKeyboard } from "@/utils/keyboard";
import { createButtonImages } from "@/utils/tabs";
import { isValidLocation } from "@/validations/excursion";
import { isValidControlButton } from "@/validations/state";
import { isValidTab } from "@/validations/tabs";
import { initUserForExcursion } from "./tabs/excursion";

const storeController = new StoreController();

const start: MessageHandler = async (ctx) => {
  const markup = createKeyboard("inline", createButtonImages(tabs), {oneTime: true});

  ctx.replyWithPhoto("https://rut-miit.ru/content/opengraph-image_1_1920x1280.jpg?id_wm=884159", {caption: replies.GREETINGS, reply_markup: markup});
};

const help: MessageHandler = (ctx) => {
  ctx.reply("Help message received!");
};

const messageHandler: MessageHandler = (ctx) => {
  ctx.reply(`Message "${ctx.message}" received!`);
};

const inlineButtonClickHandler: MessageHandler = (ctx) => {
  if(!ctx.callbackQuery || !ctx.callbackQuery.data) {
    throw new Error("Cannot process callback query!");
  }

  if(!ctx.chat || !ctx.chat.id) {
    throw new Error("Cannot identify chat id!");
  }

  const clickedButtonData = ctx.callbackQuery.data;
  const chatId = ctx.chat.id;

  if(isValidTab(clickedButtonData)) {
    tabs[clickedButtonData as TabName].onClick(ctx);
    return;
  }

  if(isValidLocation(clickedButtonData)) {
    initUserForExcursion(ctx, storeController, {userId: chatId, location: clickedButtonData as keyof LocationList});
    return;
  }

  if(isValidControlButton(clickedButtonData)) {
    switch(clickedButtonData) {
      case ControlButtons.NEXT:
        storeController.nextStep(chatId);
        break;
      case ControlButtons.PREV:
        storeController.prevStep(chatId);
        break;
      case ControlButtons.HUB:
        storeController.removeUser(chatId);
        start(ctx);
        break;
    }

    return;
  }
};

export {
  start,
  help,
  messageHandler,
  inlineButtonClickHandler
};
