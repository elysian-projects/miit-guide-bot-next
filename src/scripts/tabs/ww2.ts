import { getTabData } from "@/utils/data";
import { Context } from "grammy";

export const miitWar = (ctx: Context) => {
  const tabData = getTabData("ww2");
  ctx.reply(tabData.content, {reply_markup: tabData.replyMarkup});
};
