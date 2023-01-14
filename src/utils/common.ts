import { paginationStack } from "@/components/control-flow/pagination/pagination";
import { ButtonsList, KeyboardController, removeInlineKeyboard } from "@/components/reply-markup";
import { storeController } from "@/env";
import { Tab, TabsController, TabsList } from "@/external/tabs";
import { start } from "@/scripts/commands";
import { UserId } from "@/types/user";
import { Context } from "grammy";

// TODO: move this somewhere
export const takeControlButtonAction = (ctx: Context, button: ButtonsList, userId: UserId) => {
  switch (button) {
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
      // TODO: find a closer place to pagination module to remove user from the stack
      // Remove user from the stack
      paginationStack.removeUser(userId);
      removeInlineKeyboard(ctx);
      start(ctx);
      break;
  }
};

type TabProps = {
  userId: UserId,
  tabData: Tab
}
export const computeTabProps = (ctx: Context, tabName: TabsList): TabProps => {
  // This definitely should NOT throw an exception but invalid context is the Telegram API
  // issue, so if this exception is thrown, there is a problem with Telegram and there must
  // be a better way to handle it rather than just throwing an exception
  if (!ctx.chat || !ctx.chat.id) {
    throw new Error("Invalid context!");
  }

  const userId = ctx.chat.id;
  const tabData = TabsController.getTabData(tabName);

  return {
    userId,
    tabData
  };
};