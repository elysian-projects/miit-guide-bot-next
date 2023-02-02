import { helpCommandModel, startCommandModel, unknownCommandModel } from "@/models/commands.model";
import { getChatId } from "@/utils/common";
import { Context } from "grammy";

export const onStart = async (ctx: Context) => {
  await startCommandModel(ctx, getChatId(ctx));
};

export const onHelp = async (ctx: Context) => {
  await helpCommandModel(ctx);
};

export const onUnknown = async (ctx: Context) => {
  await unknownCommandModel(ctx);
};
