import { Context } from "telegraf";

export type MessageHandler<T extends object = object> = {
  (ctx: Context, payload?: T): void
}
