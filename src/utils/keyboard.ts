import { keyboardDefaultOptions } from "@/constants/buttons";
import { Image } from "@/types/common";
import { InlineKeyboardOptions, KeyboardType, MenuKeyboardOptions } from "@/types/lib";
import { Context, InlineKeyboard, Keyboard } from "grammy";

/**
 * Calculates and returns the column size for buttons
 * @private
 */
const calculateButtonColumnSize = (column?: number) => {
  return column ?? keyboardDefaultOptions.columns;
};

/**
 * Creates a keyboard markup, adds given buttons there and returns it
 *
 * @param {KeyboardType} type: type of the keyboard
 * @param {ButtonImage[]} buttons: array of button images to be shown as buttons
 * @param {MenuKeyboardOptions | InlineKeyboardOptions} options: optional settings to change the way buttons look
 * @returns {Keyboard | InlineKeyboard}
 */
export function createKeyboard(type: "menu", buttons: Image[], options?: MenuKeyboardOptions): Keyboard;
export function createKeyboard(type: "inline", buttons: Image[], options?: InlineKeyboardOptions): InlineKeyboard;
export function createKeyboard(type: KeyboardType, buttons: Image[], options?: MenuKeyboardOptions | InlineKeyboardOptions): unknown {
  if(buttons.length === 0) {
    throw new Error("No buttons for menu keyboard given!");
  }

  const keyboardOptions = {
    ...keyboardDefaultOptions,
    ...options,
    columns: calculateButtonColumnSize(options?.columns)
  };

  let markup: Keyboard | InlineKeyboard;

  if(type === "menu") {
    markup = new Keyboard();

    keyboardOptions.resize ?? markup.resized();
    keyboardOptions.oneTime ?? markup.oneTime();
    keyboardOptions.selective ?? markup.selected(true);
    keyboardOptions.placeholder ?? markup.placeholder(keyboardOptions.placeholder);
  } else {
    markup = new InlineKeyboard();
  }

  buttons.forEach((button, index) => {
    markup.text(button.label, button.value);
    ((index + 1) % keyboardOptions.columns === 0) ?? markup.row();
  });

  return markup;
}

export const removeInlineKeyboard = (ctx: Context): void => {
  ctx.editMessageReplyMarkup({reply_markup: new InlineKeyboard()});
};
