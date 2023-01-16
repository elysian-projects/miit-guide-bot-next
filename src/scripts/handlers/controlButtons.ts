import { KeyboardController, removeInlineKeyboard } from "@/components/reply-markup";
import { storeController } from "@/env";
import { getChatId } from "@/utils/common";
import { Context } from "grammy";
import { start } from "../commands";

export const handleControlClick = (ctx: Context) => {
  const userId = getChatId(ctx);

  const clickData = ctx.msg?.text ?? ctx.callbackQuery?.data;

  if(!clickData) {
    throw new Error("Invalid context!");
  }


  switch (clickData) {
    case "NEXT":
    case KeyboardController.getLabelByValue("NEXT"):
      storeController.getUser(userId).nextStep();
      removeInlineKeyboard(ctx);
      break;
    case "PREV":
    case KeyboardController.getLabelByValue("PREV"):
      storeController.getUser(userId).prevStep();
      removeInlineKeyboard(ctx);
      break;
    case "HUB":
    case KeyboardController.getLabelByValue("HUB"):
      removeInlineKeyboard(ctx);
      start(ctx);
      break;
  }
};
