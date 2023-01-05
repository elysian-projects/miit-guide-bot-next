import { tabsData } from "@/env";
import { MessageHandler } from "@/types/lib";
import { TabsList } from "@/types/tabs";
import { removeInlineKeyboard } from "@/utils/keyboard";

export const tabsButtonClickHandler: MessageHandler = async (ctx) => {
  await ctx.answerCallbackQuery();

  const buttonData = ctx.callbackQuery?.data;

  // TODO: move this to an external method
  if(!buttonData) {
    throw new Error("Invalid contest");
  }

  tabsData[buttonData as TabsList].onClick(ctx);
  removeInlineKeyboard(ctx);
};
