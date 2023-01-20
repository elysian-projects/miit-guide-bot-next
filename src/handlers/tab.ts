import { removeInlineReplyMarkup } from "@/components/reply-markup";
import { locationChoiceHandler, tabWW2Handler } from "@/tabs/";
import { TabValues } from "@/types/user";
import { Context } from "grammy";

const tabHandlers: {[key in TabValues]: (ctx: Context) => void} = {
  locations: locationChoiceHandler,
  ww2: tabWW2Handler
};

export const handleTabClick = (ctx: Context): void => {
  removeInlineReplyMarkup(ctx);

  const buttonData = ctx.callbackQuery?.data;

  if(!buttonData) {
    throw new Error("Invalid callback query, cannot compute a clicked tab!");
  }

  tabHandlers[buttonData as TabValues](ctx);
};
