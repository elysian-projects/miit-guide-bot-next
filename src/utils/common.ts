import { storeController } from "@/bootstrap";
import { paginationBuffer } from "@/components/control-flow/pagination/pagination";
import { ChatId } from "@/types/user";
import { Context } from "grammy";

export const getChatId = (ctx: Context): ChatId => {
  const chatId = ctx.msg?.chat.id;

  if(!chatId) {
    throw new Error("Invalid context, id not found!");
  }

  return chatId;
};

/**
 * Removes user from the main application store and pagination buffer
 * @param {UserId} userId - chat id provided by the Telegram API
 */
export const removeUserFromStores = (chatId: ChatId): void => {
  // Remove user from the list to avoid unexpected bugs
  storeController.removeUser(chatId);
  // Remove user from the stack
  paginationBuffer.removeUser(chatId);
};
