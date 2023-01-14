import { KeyboardController } from "@/components/reply-markup";
import { TabsController } from "@/external/tabs";
import { help, messageHandler, start } from "@/scripts/commands";
import { controlButtonClickHandler, locationButtonClickHandler, tabsButtonClickHandler } from "@/scripts/handlers/";
import { config } from "@/utils/config";
import { createBot } from "@/utils/lib";
import { LocationsController } from "./external/locations";
import { buttonContextMiddleware } from "./utils/middlewares";

const bot = createBot(config.get("TOKEN"));

// Base commands handlers
bot.command("start", start);
bot.command("help", help);

// Inline buttons handlers
bot.callbackQuery(KeyboardController.getValues(), ctx => buttonContextMiddleware(ctx, controlButtonClickHandler));
bot.callbackQuery(LocationsController.getValues(), ctx => buttonContextMiddleware(ctx, locationButtonClickHandler));
bot.callbackQuery(TabsController.getValues(), ctx => buttonContextMiddleware(ctx, tabsButtonClickHandler));

// Controls buttons caught as menu buttons
bot.hears(KeyboardController.getLabels(), ctx => buttonContextMiddleware(ctx, controlButtonClickHandler));

// The rest uncaught events
bot.on("message", messageHandler);

// Env event handlers
process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());

// Start main loop (this function uses pooling)
bot.start();
