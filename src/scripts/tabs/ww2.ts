import { tabs } from "@/env";
import { Context } from "grammy";

export const miitWar = (ctx: Context) => {
  ctx.reply(tabs.ww2.reply, {reply_markup: tabs.ww2.buttons});
};
