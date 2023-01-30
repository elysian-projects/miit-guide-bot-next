import { onHelp, onStart, onUnknown } from "@/chat/commands";
import { AxiosError } from "axios";
import { config as dotenvConfig } from "dotenv";
import { Bot, GrammyError, HttpError } from "grammy";
import { NO_CONTENT, NO_TG_CONNECTION } from "./chat/constants";
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
  const e = err.error as {description: string};

  switch(e.constructor) {
    // Appears when there is a problem on the client side and the Telegram server could not process the response
    case GrammyError: {
      console.error("Error in request:", e.description);
      ctx.reply("Произошла ошибка, приносим свои извинения!");
      break;
    }

    // Appears when the Telegram servers are not available or failed to connect, this might be due to
    // loss of internet connection or any other network reasons. The problem is, this cannot be processed properly
    case HttpError: {
      console.error("Could not contact Telegram:", e);
      ctx.reply(NO_TG_CONNECTION);
      break;
    }

    // Appear when our server sends a response with status different from `2**` or doesn't respond at all,
    // in this case the data cannot be fetched or there is just nothing to fetch (empty response with `404` status code)
    case AxiosError: {
      console.error("Axios error:", e.description);
      ctx.reply(NO_CONTENT);
      break;
    }

    // Any other kind of error
    default: {
      console.error("Unknown error:", e);
      ctx.reply("Неизвестная ошибка!");
      break;
    }
  }
});

// Start bot using pooing
bot.start();
