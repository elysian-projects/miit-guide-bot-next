import { Context } from "grammy";
import { UserId } from "./user";

export interface HandlerOptions {
  ctx: Context,
  userId: UserId,
}

export interface ButtonContentOptions extends HandlerOptions {
  clickData: string
}

/**
 * @deprecated
 */
export type ButtonClickHandler = {
  (options: ButtonContentOptions): void
}