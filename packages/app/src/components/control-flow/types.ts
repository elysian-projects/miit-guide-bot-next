import { ChatId } from "@/types/user";
import { Context } from "grammy";

export interface IControlFlow {
  sendData: (ctx: Context, chatId: ChatId) => void,
}
