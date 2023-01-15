import { ReplyMarkupType } from "@/components/reply-markup";
import { Context } from "grammy";
import { ParseMode } from "grammy/out/types.node";

export type MessageHandler<T extends object = object> = {
  (ctx: Context, payload?: T): void
}

export type MessageProps<K extends ReplyMarkupType> = {
  parse_mode: ParseMode,
  reply_markup: K
}