import { locationsList, tabsList } from "@/env";
import { help, messageHandler, start } from "@/scripts/commands";
import { controlButtonClickHandler, locationButtonClickHandler, tabsButtonClickHandler } from "@/scripts/handlers/";
import { ControlButtons } from "@/types/lib";
import { config } from "@/utils/config";
import { createBot } from "@/utils/lib";
import { KeyboardButtons } from "./constants/buttons";

const bot = createBot(config.get("TOKEN"));

// Base commands handlers
bot.command("start", start);
bot.command("help", help);

// Inline buttons handlers
bot.callbackQuery(Object.keys(ControlButtons), controlButtonClickHandler);
bot.callbackQuery(locationsList, locationButtonClickHandler);
bot.callbackQuery(tabsList, tabsButtonClickHandler);

// Controls buttons caught as menu buttons
bot.hears(Object.values(KeyboardButtons).map(button => button.label), controlButtonClickHandler);

// The rest uncaught events
bot.on("message", messageHandler);

// Env event handlers
process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());

// Start main loop (this function is starting bot with pooling)
bot.start();
