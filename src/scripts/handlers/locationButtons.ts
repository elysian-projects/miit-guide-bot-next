import { Pagination } from "@/components/control-flow";
import { storeController } from "@/env";
import { LocationsList } from "@/external/locations";
import { UserStatus } from "@/types/user";
import { getChatId } from "@/utils/common";
import { Context } from "grammy";
import { initUserForExcursion } from "../tabs/excursion";

export const handleLocationClick = (ctx: Context, clickData: string) => {
  const userId = getChatId(ctx);

  if(storeController.getUser(userId).getStatus() === UserStatus.EXCURSION_HUB) {
    initUserForExcursion(
      ctx,
      {
        userId: userId,
        location: clickData as LocationsList,
        controlFlow: new Pagination()
      }
    );
  }
};
