import { Context, InlineKeyboard, Keyboard } from "grammy";
import { ParseMode, ReplyKeyboardRemove } from "grammy/out/types.node";

/** Keyboard type that represents how the markup is displayed */
export type KeyboardType = "menu" | "inline";

/** Keyboard types used in a chat */
export type AvailableKeyboardTypes = Keyboard | InlineKeyboard | ReplyKeyboardRemove;

/** Available library reply markup types */
export type ReplyMarkupType = {
  "menu": Keyboard,
  "inline": InlineKeyboard
}

/**
 * Main type for the whole application that represents an object that can be displayed and also used in code.
 * It includes the `label` property to be displayed somewhere and the `value` property to be used in code.
 */
export interface Image<V extends string = string, L extends string = string> {
  label: L,
  value: V
}

export type MessageHandler<T extends object = object> = {
  (ctx: Context, payload?: T): void
}

export type MessageProps<K extends AvailableKeyboardTypes> = {
  parse_mode: ParseMode,
  reply_markup: K
}
