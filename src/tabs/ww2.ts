import { Context } from "grammy";

export const tabWW2Handler = async (ctx: Context): Promise<void> => {
  await ctx.reply("WW2");
};
