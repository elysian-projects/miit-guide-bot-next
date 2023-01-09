import { UNKNOWN_COMMAND } from "@/constants/replies";
import { MessageHandler } from "@/types/lib";

export const messageHandler: MessageHandler = (ctx) => {
  ctx.reply(UNKNOWN_COMMAND);
};
