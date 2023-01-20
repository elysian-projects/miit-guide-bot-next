import { storeController } from "@/bootstrap";
import { onStart } from "@/chat/commands";
import { keyboardControls } from "@/chat/controls";
import { removeInlineReplyMarkup } from "@/components/reply-markup";
import { getChatId } from "@/utils/common";
import { Context } from "grammy";

export const handleControlButtonClick = (ctx: Context) => {
  const chatId = getChatId(ctx);

  // Control button might be caught either from the inline keyboard
  // or as a casual message in the chat, so we must process both
  const clickData = ctx.callbackQuery?.data ?? ctx.msg?.text;

  switch (clickData) {
    case keyboardControls.NEXT.label:
    case keyboardControls.NEXT.value:
      storeController.getUser(chatId).nextStep();
      // removeInlineReplyMarkup(ctx);
      break;
    case keyboardControls.PREV.label:
    case keyboardControls.PREV.value:
      storeController.getUser(chatId).prevStep();
      // removeInlineReplyMarkup(ctx);
      break;
    case keyboardControls.HUB.label:
    case keyboardControls.HUB.value:
      removeInlineReplyMarkup(ctx);
      onStart(ctx);
      break;
    }
};
