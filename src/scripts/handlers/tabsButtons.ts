import { storeController } from "@/env";
import { TabsList } from "@/external/tabs";
import { UserStatus } from "@/types/user";
import { computeTabProps } from "@/utils/common";
import { Context } from "grammy";

export const handleTabClick = (ctx: Context, data: string) => {
  const {userId, tabData} = computeTabProps(ctx, data as TabsList);

  storeController.addUser(userId);
  storeController.getUser(userId).setStatus(UserStatus.EXCURSION_HUB);

  console.log(tabData);

  ctx.reply(tabData.content, {reply_markup: tabData.replyMarkup});
};
