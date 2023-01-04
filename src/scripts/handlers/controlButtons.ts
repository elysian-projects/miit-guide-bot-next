import { storeController } from "@/env";
import { ControlButtons, MessageHandler } from "@/types/lib";
import { removeInlineKeyboard } from "@/utils/keyboard";
import { start } from "../commands";

export const controlButtonClickHandler: MessageHandler = async (ctx) => {
  await ctx.answerCallbackQuery();

  const chatId = ctx.chat?.id;
  const buttonData = ctx.callbackQuery?.data;

  // TODO: move this to an external method
  if(!chatId || !buttonData) {
    throw new Error("Invalid context");
  }

  switch(buttonData) {
    case ControlButtons.NEXT:
      storeController.nextStep(chatId);
      removeInlineKeyboard(ctx);
      break;
    case ControlButtons.PREV:
      storeController.prevStep(chatId);
      removeInlineKeyboard(ctx);
      break;
    case ControlButtons.HUB:
      storeController.removeUser(chatId);
      removeInlineKeyboard(ctx);
      start(ctx);
      break;
  }
};
