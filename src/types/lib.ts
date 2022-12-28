import { Context } from "grammy";

export type MenuButtonOptions = {
  resize?: boolean,
  columns?: number,
  selective?: boolean,
  oneTime?: boolean
}

export type ButtonImage = {
  label: string,
  value: string
}

export type MessageHandler<T extends object = object> = {
  (ctx: Context, payload?: T): void
}

export type InlineCallbackCtx = Context;

/**
 * @note
 * /node_modules/telegram/update.d.ts :71
 * The type is NOT implemented properly, as the object sent by Telegram is different from the library type definition
 */
export type InlineButtonClickHandler = {
  (ctx: InlineCallbackCtx): void
}
