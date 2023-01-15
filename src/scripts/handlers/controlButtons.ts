import { KeyboardController, removeInlineKeyboard } from "@/components/reply-markup";
import { storeController } from "@/env";
import { ButtonClickHandler } from "@/types/mixins";
import { start } from "../commands";

export const controlButtonClickHandler: ButtonClickHandler = async ({ctx, userId, clickData}) => {
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
