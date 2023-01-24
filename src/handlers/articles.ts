import { removeInlineReplyMarkup } from "@/components/reply-markup";
import { Context } from "grammy";

export const handleArticleClick = (ctx: Context, buttonData: string): void => {
  removeInlineReplyMarkup(ctx);
  ctx.reply(`Show article ${buttonData}`);
};
