import { onHelp, onStart, onUnknown } from "@/controllers/commands.controller";
import { config as dotenvConfig } from "dotenv";
import { Bot } from "grammy";
import { keyboardControls } from "./constants/controls";
import { errorController } from "./controllers/error.controller";
import { onKeyboardClick } from "./controllers/keyboard.controller";
import { Store } from "./entities/store";
import { extractFromImages } from "./utils/image";

dotenvConfig();

// Global environment variables used in the application
export const store = new Store();

// Main bot instance, make sure IT IS NOT EXPORTED!
const bot = new Bot(process.env.TOKEN ?? "");

// Casual bot commands
bot.command("start", onStart);
bot.command("help", onHelp);

// Trigger keyboard click router
bot.on("callback_query:data", onKeyboardClick);

// Control button click from the menu keyboard
bot.hears(extractFromImages(Object.values(keyboardControls), "label"), onKeyboardClick);

// None of the above handlers were caught
bot.on("message", onUnknown);

// Handling errors
bot.catch(errorController);

// Start bot using pooing
bot.start();
