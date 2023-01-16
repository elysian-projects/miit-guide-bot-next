import { storeController } from "@/env";
import { UserStatus } from "@/types/user";
import { computeTabProps } from "@/utils/common";
import { Context } from "grammy";

export const handleTabClick = (ctx: Context) => {
  const {userId, tabData} = computeTabProps(ctx, "excursion");

  storeController.addUser(userId);
  storeController.getUser(userId).setStatus(UserStatus.EXCURSION_HUB);

  ctx.reply(tabData.content, {reply_markup: tabData.replyMarkup});
};

// TODO: remove
// export const tabsButtonClickHandler: ButtonClickHandler = async ({ctx}) => {
//   // tabsData[clickData as TabsList].onClick(ctx);
//   removeInlineKeyboard(ctx);
// };
