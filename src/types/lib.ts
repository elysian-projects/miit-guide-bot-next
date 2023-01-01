import { Context } from "grammy";

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

export type ButtonImage = {
  label: string,
  value: string
}

export type MessageHandler<T extends object = object> = {
  (ctx: Context, payload?: T): void
}

export type InlineCallbackCtx = Context;
export type InlineButtonClickHandler = {
  (ctx: InlineCallbackCtx): void
}
