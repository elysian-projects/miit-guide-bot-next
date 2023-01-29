import { storeController } from "@/bootstrap";
import { onStart } from "@/chat/commands";
import { keyboardControls } from "@/chat/controls";
import { removeInlineReplyMarkup } from "@/components/reply-markup";
import { getChatId } from "@/utils/common";
import { Context } from "grammy";

export const handleControlButtonClick = (ctx: Context, clickData: string) => {
  const chatId = getChatId(ctx);

  switch (clickData) {
    case keyboardControls.NEXT.label:
    case keyboardControls.NEXT.value:
      storeController.getUser(chatId).nextStep();
      break;
    case keyboardControls.PREV.label:
    case keyboardControls.PREV.value:
      storeController.getUser(chatId).prevStep();
      break;
    case keyboardControls.HUB.label:
    case keyboardControls.HUB.value:
      removeInlineReplyMarkup(ctx);
      onStart(ctx);
      break;
  }
};
