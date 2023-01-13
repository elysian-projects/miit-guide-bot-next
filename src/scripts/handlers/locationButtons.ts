import { storeController } from "@/env";
import { LocationsList } from "@/types/location";
import { ButtonClickHandler } from "@/types/mixins";
import { UserStatus } from "@/types/user";
import { removeInlineKeyboard } from "@/utils/keyboard";
import { initUserForExcursion } from "../tabs/excursion";

export const locationButtonClickHandler: ButtonClickHandler = async ({ctx, userId, clickData}) => {
  if(storeController.getUser(userId).getStatus() === UserStatus.EXCURSION_HUB) {
    initUserForExcursion(ctx, {userId: userId, location: clickData as LocationsList});
    removeInlineKeyboard(ctx);
  }
};
