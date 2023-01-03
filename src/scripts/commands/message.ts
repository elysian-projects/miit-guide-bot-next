import { MessageHandler } from "@/types/lib";

export const messageHandler: MessageHandler = (ctx) => {
  ctx.reply(`Message "${ctx.message}" received!`);
};
