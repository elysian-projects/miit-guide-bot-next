import { Context, InlineKeyboard, Keyboard } from "grammy";
import { ParseMode } from "grammy/out/types.node";

export type MessageHandler<T extends object = object> = {
  (ctx: Context, payload?: T): void
}

export type MessageProps<K extends Keyboard | InlineKeyboard> = {
  parse_mode: ParseMode,
  reply_markup: K
}