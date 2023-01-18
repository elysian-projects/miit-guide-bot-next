import { KeyboardController, removeInlineKeyboard } from "@/components/reply-markup";
import { storeController } from "@/env";
import { getChatId } from "@/utils/common";
import { Context } from "grammy";
import { start } from "../commands";

export const handleControlClick = (ctx: Context, clickData: string) => {
  const userId = getChatId(ctx);

  // FIXME: makes sense to place `removeInlineKeyboard` function after the switch-case
  // but getting back to main hub must be checked (in this case we need to remove the keyboard
  // before we call the `start` function as it includes its own inline keyboard)
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
