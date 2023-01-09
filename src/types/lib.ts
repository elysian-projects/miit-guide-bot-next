import { Context, InlineKeyboard, Keyboard } from "grammy";
import { ParseMode } from "grammy/out/types.node";
import { Image } from "./common";

/**
 * Type of a keyboard to be shown when the message is sent:
 * - `menu` is a keyboard by the input field
 * - `inline` is an inline keyboard that is attached to the sent message
 */
export type KeyboardType = "menu" | "inline";

export interface KeyboardOptions {
  columns?: number,
  selective?: boolean,
  oneTime?: boolean,
  placeholder?: string
}

export enum ControlButtons {
  NEXT = "NEXT",
  PREV = "PREV",
  HUB = "HUB"
}

export type InlineKeyboardOptions = KeyboardOptions
export interface MenuKeyboardOptions extends KeyboardOptions {
  resize?: boolean,
}

export type ButtonImage = Image<keyof typeof ControlButtons>;

export type MessageHandler<T extends object = object> = {
  (ctx: Context, payload?: T): void
}

export type MessageProps<K extends Keyboard | InlineKeyboard> = {
  parse_mode: ParseMode,
  reply_markup: K
}
