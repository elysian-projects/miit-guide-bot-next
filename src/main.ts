import * as handlers from "@/scripts/handlers";
import { config } from "@/utils/config";
import { createBot } from "@/utils/lib";

const bot = createBot(config.get("TOKEN"));

bot.command("start", ctx => handlers.start(ctx));
bot.command("help", ctx => handlers.help(ctx));

bot.on("message", ctx => handlers.messageHandler(ctx));
bot.on("callback_query:data", ctx => handlers.inlineButtonClickHandler(ctx));

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());

bot.start();
