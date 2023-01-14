import { TabsController } from "@/external/tabs";
import { Context } from "grammy";

export const miitWar = (ctx: Context) => {
  const tabData = TabsController.getTabData("ww2");
  ctx.reply(tabData.content, {reply_markup: tabData.replyMarkup});
};
