import * as handlers from "@/scripts/handlers";
import { config } from "@/utils/config";
import { createBot } from "@/utils/lib";
import { tabs } from "./env";
import { isValidTab } from "./validations/tabs";

const bot = createBot(config.get("TOKEN"));

bot.command("start", ctx => handlers.start(ctx));
bot.command("help", ctx => handlers.help(ctx));

bot.on("message", ctx => handlers.messageHandler(ctx));

// TODO: find out the context type, move it to @/types/lib
bot.on("callback_query:data", ctx => {
  const clickedButtonData = ctx.callbackQuery.data;

  if(isValidTab(clickedButtonData)) {
    tabs[clickedButtonData].handler(ctx);
  }
});

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());

bot.start();
