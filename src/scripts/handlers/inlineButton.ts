import { storeController, tabs } from "@/env";
import { ControlButtons, MessageHandler } from "@/types/lib";
import { LocationList } from "@/types/location";
import { TabName } from "@/types/tabs";
import { UserStatus } from "@/types/user";
import { isValidLocation } from "@/validations/excursion";
import { isValidControlButton } from "@/validations/state";
import { isValidTab } from "@/validations/tabs";
import { start } from "../commands";
import { initUserForExcursion, sendDataNode } from "../tabs/excursion";

export const inlineButtonClickHandler: MessageHandler = (ctx) => {
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

  if(storeController.getUserStatus(chatId) === UserStatus.EXCURSION_HUB && isValidLocation(clickedButtonData)) {
    initUserForExcursion(ctx, {userId: chatId, location: clickedButtonData as keyof LocationList});
    return;
  }

  if(isValidControlButton(clickedButtonData)) {
    switch(clickedButtonData) {
      case ControlButtons.NEXT:
        storeController.nextStep(chatId);
        sendDataNode(ctx, chatId);
        break;
      case ControlButtons.PREV:
        storeController.prevStep(chatId);
        sendDataNode(ctx, chatId);
        break;
      case ControlButtons.HUB:
        storeController.removeUser(chatId);
        start(ctx);
        break;
    }

    return;
  }
};
