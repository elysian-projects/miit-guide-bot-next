import { storeController } from "@/env";
import { MessageHandler } from "@/types/lib";
import { LocationsList } from "@/types/location";
import { UserStatus } from "@/types/user";
import { removeInlineKeyboard } from "@/utils/keyboard";
import { initUserForExcursion } from "../tabs/excursion";

export const locationButtonClickHandler: MessageHandler = async (ctx) => {
  await ctx.answerCallbackQuery();

  const chatId = ctx.chat?.id;
  const buttonData = ctx.callbackQuery?.data;

  // TODO: move this to an external method
  if(!chatId || !buttonData) {
    throw new Error("Invalid contest");
  }

  if(storeController.getUserStatus(chatId) === UserStatus.EXCURSION_HUB) {
    initUserForExcursion(ctx, {userId: chatId, location: buttonData as keyof LocationsList});
    removeInlineKeyboard(ctx);
  }
};
