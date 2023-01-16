import { storeController } from "@/env";
import { LocationsList } from "@/external/locations";
import { UserStatus } from "@/types/user";
import { getChatId } from "@/utils/common";
import { Context } from "grammy";
import { initUserForExcursion } from "../tabs/excursion";

export const handleLocationClick = (ctx: Context) => {
  const userId = getChatId(ctx);

  const clickData = ctx.msg?.text ?? ctx.callbackQuery?.data;

  if(!clickData) {
    throw new Error("Invalid context!");
  }

  if(storeController.getUser(userId).getStatus() === UserStatus.EXCURSION_HUB) {
    initUserForExcursion(ctx, {userId: userId, location: clickData as LocationsList});
  }
};
