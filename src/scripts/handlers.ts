import { MessageHandler } from "@/types/handlers";

const start: MessageHandler<string[]> = (ctx, payload) => {
  if(!payload) {
    throw new Error("No payload at `start` given!");
  }

  ctx.sendMessage("Welcome!");
};

const help: MessageHandler = (ctx) => {
  ctx.sendMessage("Help message received!");
};

const messageHandler: MessageHandler = (ctx) => {
  ctx.sendMessage(`Message "${ctx.message}" received!`);
};

export {
  start,
  help,
  messageHandler
};
