import { InlineKeyboardMarkup, ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram";

export type Tab = {
  icon?: string,
  label: string,
  description: string,
  buttons: InlineKeyboardMarkup | ReplyKeyboardMarkup,
}

export type Tabs = {
  [key: string]: Tab
}
