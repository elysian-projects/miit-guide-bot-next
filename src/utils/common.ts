import { paginationBuffer } from "@/components/control-flow/pagination/pagination";
import { storeController } from "@/env";
import { Tab, TabsController, TabsList } from "@/external/tabs";
import { UserId } from "@/types/user";
import { Context } from "grammy";

type TabProps = {
  userId: UserId,
  tabData: Tab
}
export const computeTabProps = (ctx: Context, tabName: TabsList): TabProps => {
  return {
    userId: getChatId(ctx),
    tabData: TabsController.getTabData(tabName)
  };
};

/**
 * Removes user from the main application store and pagination buffer
 * @param {UserId} userId - chat id provided by the Telegram API
 */
export const removeUserFromStores = (userId: UserId): void => {
  // Remove user from the list to avoid unexpected bugs
  storeController.removeUser(userId);
  // Remove user from the stack
  paginationBuffer.removeUser(userId);
};

/**
 * Checks if chat id was provided in the context and throws an error if it's not.
 * @param {Context} ctx - the context provided by the Telegram API
 */
export const getChatId = (ctx: Context): UserId => {
  if(!ctx.chat || !ctx.chat.id) {
    throw new Error("Cannot identify chat id!");
  }
  return ctx.chat.id;
};