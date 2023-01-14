import { Image } from "@/types/common";
import { InlineKeyboard, Keyboard } from "grammy";

export type ButtonsList = "NEXT" | "PREV" | "HUB";

/**
 * Type of a keyboard to be shown when the message is sent:
 * - `menu` is a keyboard by the input field
 * - `inline` is an inline keyboard that is attached to the sent message
 */
export type KeyboardType = "menu" | "inline";

export interface KeyboardOptions {
  columns?: number,
  oneTime?: boolean
}

export type InlineKeyboardOptions = KeyboardOptions;
export interface MenuKeyboardOptions extends KeyboardOptions {
  resize?: boolean,
  selective?: boolean,
  placeholder?: string
}

export type ButtonImage = Image<ButtonsList>;

export type InferReplyMarkupType<T extends KeyboardType> = T extends "menu" ? Keyboard : InlineKeyboard;
