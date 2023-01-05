import { locationsList, tabsList } from "@/env";
import { help, messageHandler, start } from "@/scripts/commands";
import { controlButtonClickHandler, locationButtonClickHandler, tabsButtonClickHandler } from "@/scripts/handlers/";
import { ControlButtons } from "@/types/lib";
import { config } from "@/utils/config";
import { createBot } from "@/utils/lib";

const bot = createBot(config.get("TOKEN"));

// Base commands handlers
bot.command("start", ctx => start(ctx));
bot.command("help", ctx => help(ctx));

// Inline buttons handlers
bot.callbackQuery(Object.keys(ControlButtons), ctx => controlButtonClickHandler(ctx));
bot.callbackQuery(locationsList, ctx => locationButtonClickHandler(ctx));
bot.callbackQuery(tabsList, ctx => tabsButtonClickHandler(ctx));

// The rest uncaught events
bot.on("message", ctx => messageHandler(ctx));

// Env event handlers
process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());

// Start main loop (this function is starting bot with pooling)
bot.start();
