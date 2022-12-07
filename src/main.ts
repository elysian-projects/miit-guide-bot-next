import * as handlers from "@/scripts/handlers";
import { config } from "@/utils/config";
import { createBot } from "@/utils/lib";

const bot = createBot(config.get("TOKEN"));

bot.start(ctx =>  handlers.start(ctx, []));
bot.help(ctx => handlers.help(ctx));

bot.on("message", ctx => handlers.messageHandler(ctx));

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

bot.launch();
