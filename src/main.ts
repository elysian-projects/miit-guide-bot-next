import { locationsList, tabsList } from "@/env";
import { help, messageHandler, start } from "@/scripts/commands";
import { controlButtonClickHandler, locationButtonClickHandler, tabsButtonClickHandler } from "@/scripts/handlers/";
import { ControlButtons } from "@/types/lib";
import { config } from "@/utils/config";
import { createBot } from "@/utils/lib";
import { KeyboardButtons } from "./constants/buttons";
import { buttonContextMixin } from "./utils/mixins";

const bot = createBot(config.get("TOKEN"));

// Base commands handlers
bot.command("start", start);
bot.command("help", help);

// Inline buttons handlers
// TODO: make something with the buttons!
bot.callbackQuery(Object.keys(ControlButtons), ctx => buttonContextMixin(ctx, controlButtonClickHandler));
bot.callbackQuery(locationsList, ctx => buttonContextMixin(ctx, locationButtonClickHandler));
bot.callbackQuery(tabsList, ctx => buttonContextMixin(ctx, tabsButtonClickHandler));

// Controls buttons caught as menu buttons
// TODO: make something with the buttons!
bot.hears(Object.values(KeyboardButtons).map(button => button.label), ctx => buttonContextMixin(ctx, controlButtonClickHandler));

// The rest uncaught events
bot.on("message", messageHandler);

// Env event handlers
process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());

// Start main loop (this function uses pooling)
bot.start();
