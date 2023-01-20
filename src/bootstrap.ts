import { onHelp, onStart, onUnknown } from "@/chat/commands";
import { config as dotenvConfig } from "dotenv";
import { Bot } from "grammy";
import { keyboardControls } from "./chat/controls";
import { locationImages, tabImages } from "./chat/images";
import { StoreController } from "./controllers/storeController";
import { handleControlButtonClick } from "./handlers/controlButtons";
import { handleLocationClick } from "./handlers/locations";
import { handleTabClick } from "./handlers/tab";
import { extractFromImages } from "./utils/image";

dotenvConfig();

// Global environment variables used in the application
export const storeController = new StoreController();

// Main bot instance, make sure IT IS NOT EXPORTED!
const bot = new Bot(process.env.TOKEN ?? "");

// Casual bot commands
bot.command("start", onStart);
bot.command("help", onHelp);

// Inline keyboard handlers //

// Tab in the main hub clicked
bot.callbackQuery(extractFromImages(tabImages, "value"), handleTabClick);
// Works out on location selection
bot.callbackQuery(extractFromImages(locationImages, "value"), handleLocationClick);
// Control button clicked
bot.callbackQuery(extractFromImages(Object.values(keyboardControls), "value"), handleControlButtonClick);

// None of the above handlers were caught
bot.on("message", onUnknown);

// Start bot using pooing
bot.start();
