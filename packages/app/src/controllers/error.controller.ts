import { errorModel } from "@/models/error.model";
import { BotError, Context } from "grammy";

export const errorController = async (error: BotError<Context>) => {
  const ctx = error.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  await errorModel(ctx, error.error as {description: string});
};
