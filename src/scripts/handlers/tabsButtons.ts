import { tabs } from "@/env";
import { MessageHandler } from "@/types/lib";
import { TabName } from "@/types/tabs";
import { removeInlineKeyboard } from "@/utils/keyboard";

export const tabsButtonClickHandler: MessageHandler = async (ctx) => {
  await ctx.answerCallbackQuery();

  const chatId = ctx.chat?.id;
  const buttonData = ctx.callbackQuery?.data;

  // TODO: move this to an external method
  if(!chatId || !buttonData) {
    throw new Error("Invalid contest");
  }

  tabs[buttonData as TabName].onClick(ctx);
  removeInlineKeyboard(ctx);
};
