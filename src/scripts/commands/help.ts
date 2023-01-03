import { MessageHandler } from "@/types/lib";

export const help: MessageHandler = (ctx) => {
  ctx.reply("Help message received!");
};
