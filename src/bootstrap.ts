import { help, messageHandler, start } from "@/scripts/commands";
import { config } from "@/utils/config";
import { createBot } from "@/utils/lib";
import { KeyboardController } from "./components/reply-markup";
import { handleControlClick } from "./scripts/handlers";
import { excursionMenu, rootMenu } from "./scripts/handlers/menus";

const bot = createBot(config.get("TOKEN"));

// Register pre-generated inline menus as middlewares to use them in different
// parts of the application and not generate them manually in runtime
bot.use(rootMenu, excursionMenu);

bot.command("start", start);
bot.command("help", help);


// Inline buttons handlers
// bot.callbackQuery(KeyboardController.getValues(), ctx => buttonContextMiddleware(ctx, handleControlClick));
// bot.callbackQuery(LocationsController.getValues(), ctx => buttonContextMiddleware(ctx, handleLocationClick));
// bot.callbackQuery(TabsController.getValues(), ctx => buttonContextMiddleware(ctx, tabsButtonClickHandler));

// Controls buttons caught as menu buttons
bot.hears(KeyboardController.getLabels(), handleControlClick);

bot.on("message", messageHandler);

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());

// Start bot with pooling
bot.start();
