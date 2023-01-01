import { Context, InlineKeyboard, Keyboard } from "grammy";

export type TabName = "excursion" | "ww2";

export type Tab = {
  icon?: string,
  label: string,
  reply: string,
  buttons: InlineKeyboard | Keyboard,
  onClick: (ctx: Context) => void
}

export type Tabs = {
  [key in TabName]: Tab
}
