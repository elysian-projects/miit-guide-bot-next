import { help, messageHandler, start } from "@/scripts/commands";
import { config } from "@/utils/config";
import { createBot } from "@/utils/lib";
import { createMenu, KeyboardController } from "./components/reply-markup";
import { LocationsController } from "./external/locations";
import { TabsController } from "./external/tabs";
import { handleControlClick, handleLocationClick, handleTabClick } from "./scripts/handlers";

// Creation of the menu must be done here because it is a piece shit
// and for some reason doesn't work out (probably there's not enough time)
export const rootMenu = createMenu("root", TabsController.getImages(), handleTabClick, {oneTime: true});
export const excursionMenu = createMenu("excursion", LocationsController.getImages(), handleLocationClick, {oneTime: true});

// Main `bot` instance
const bot = createBot(config.get("TOKEN"));

// Register pre-generated inline menus as middlewares to use them in different
// parts of the application and not generate them manually in runtime
bot.use(rootMenu, excursionMenu);

bot.command("start", start);
bot.command("help", help);

// Controls button caught as menu a button (requires for `separation`)
bot.hears(KeyboardController.getLabels(), handleControlClick);

bot.on("message", messageHandler);

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());

// Start bot with pooling
bot.start();
