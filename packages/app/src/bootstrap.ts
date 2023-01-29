import { onHelp, onStart, onUnknown } from "@/chat/commands";
import { config as dotenvConfig } from "dotenv";
import { Bot, GrammyError, HttpError } from "grammy";
import { keyboardControls } from "./chat/controls";
import { KeyboardRouter } from "./controllers/keyboardClickController";
import { StoreController } from "./controllers/storeController";
import { extractFromImages } from "./utils/image";

dotenvConfig();

// Global environment variables used in the application
export const storeController = new StoreController();

// Main bot instance, make sure IT IS NOT EXPORTED!
const bot = new Bot(process.env.TOKEN ?? "");

// Router of the keyboard button click
const keyboardRouter = new KeyboardRouter();

// Casual bot commands
bot.command("start", onStart);
bot.command("help", onHelp);

// Trigger keyboard click router
bot.on("callback_query:data", keyboardRouter.redirect);

// Control button click from the menu keyboard
bot.hears(extractFromImages(Object.values(keyboardControls), "label"), keyboardRouter.redirect);

// None of the above handlers were caught
bot.on("message", onUnknown);

// Handling errors
bot.catch(err => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

// Start bot using pooing
bot.start();
