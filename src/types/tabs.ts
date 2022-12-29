import { Context, InlineKeyboard, Keyboard } from "grammy";

export type TabNames =
  | "excursion"
  | "ww2"

export type Tab = {
  icon?: string,
  label: string,
  description: string,
  buttons: InlineKeyboard | Keyboard,
  handler: (ctx: Context) => void
}

export type Tabs = {
  [key in TabNames]: Tab
}
