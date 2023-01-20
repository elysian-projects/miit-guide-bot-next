import { Image, KeyboardType, ReplyMarkupType } from "@/types/lib";
import { Context, InlineKeyboard, Keyboard } from "grammy";
import { ReplyKeyboardRemove } from "grammy/out/types.node";
import { defaultMenuKeyboardOptions } from "./constants";
import { MenuMarkupOptions } from "./types";
import { shouldBreakRow } from "./utils";

export function createReplyMarkup<T extends KeyboardType>(type: T, buttons: Image[], options?: (T extends "menu" ? Partial<MenuMarkupOptions> : {columns: number})): ReplyMarkupType[T] {
  const markup = (type === "menu")
    ? new Keyboard()
    : new InlineKeyboard();

  const keyboardOptions = computeMenuKeyboardOptions(options ?? {});

  addButtons(markup, buttons, keyboardOptions.columns);

  if(markup instanceof Keyboard) {
    markup.oneTime(keyboardOptions.oneTime);
    markup.resized(keyboardOptions.resized);
    markup.persistent(keyboardOptions.persistent);
    markup.selected(keyboardOptions.selective);

    keyboardOptions.placeholder ?? markup.placeholder(keyboardOptions.placeholder);
  }

  return markup as ReplyMarkupType[T];
}

export const removeInlineReplyMarkup = (ctx: Context) => {
  const replyMarkup = ctx.msg?.reply_markup;

  if(!replyMarkup) {
    throw new Error("Couldn't remove inline reply markup!");
  }

  ctx.editMessageReplyMarkup({reply_markup: new InlineKeyboard()});
};

export const removeMenuReplyMarkup = (): ReplyKeyboardRemove => {
  return {
    remove_keyboard: true
  };
};

const computeMenuKeyboardOptions = (options: Partial<MenuMarkupOptions>): MenuMarkupOptions => {
  return {
   ...defaultMenuKeyboardOptions,
   ...options
  };
};

const addButtons = (markup: Keyboard | InlineKeyboard, buttons: Image[], columns: number) => {
  buttons.forEach((button, index) => {
    markup.text(button.label, button.value);
    shouldBreakRow(index, columns) ?? markup.row();
  });
};
