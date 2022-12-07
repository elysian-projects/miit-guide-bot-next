import { Context } from "telegraf";

export type MessageHandler<T extends object = never> = T extends never ? {
  (ctx: Context): void
} : {
  (ctx: Context, payload: T): void
}
