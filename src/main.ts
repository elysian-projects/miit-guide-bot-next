import { help, messageHandler, start } from "@/scripts/commands";
import { inlineButtonClickHandler } from "@/scripts/handlers";
import { config } from "@/utils/config";
import { createBot } from "@/utils/lib";

const bot = createBot(config.get("TOKEN"));

bot.command("start", ctx => start(ctx));
bot.command("help", ctx => help(ctx));

bot.on("message", ctx => messageHandler(ctx));
bot.on("callback_query:data", ctx => inlineButtonClickHandler(ctx));

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());

bot.start();
