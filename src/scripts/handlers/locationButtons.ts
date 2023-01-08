import { storeController } from "@/env";
import { MessageHandler } from "@/types/lib";
import { LocationsList } from "@/types/location";
import { UserStatus } from "@/types/user";
import { removeInlineKeyboard } from "@/utils/keyboard";
import { initUserForExcursion } from "../tabs/excursion";

export const locationButtonClickHandler: MessageHandler = async (ctx) => {
  await ctx.answerCallbackQuery();

  const userId = ctx.chat?.id;
  const buttonData = ctx.callbackQuery?.data;

  // TODO: move this to an external method
  if(!userId || !buttonData) {
    throw new Error("Invalid contest");
  }

  if(storeController.getUser(userId).getStatus() === UserStatus.EXCURSION_HUB) {
    initUserForExcursion(ctx, {userId: userId, location: buttonData as keyof LocationsList});
    removeInlineKeyboard(ctx);
  }
};
