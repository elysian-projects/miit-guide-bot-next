import { keyboardDefaultOptions } from "@/constants/buttons";
import { Image, InferReplyMarkupType } from "@/types/common";
import { InlineKeyboardOptions, KeyboardType, MenuKeyboardOptions } from "@/types/lib";
import { Context, InlineKeyboard, Keyboard } from "grammy";

/**
 * Returns second type if the first value is "menu", third otherwise
 * @internal
 */
type ReplyMarkupType<T extends KeyboardType, M, I> = T extends "menu" ? M : I;

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
export function createKeyboard<
  T extends KeyboardType,
  O extends ReplyMarkupType<KeyboardType, MenuKeyboardOptions, InlineKeyboardOptions>
>
(
  type: T,
  buttons: Image[],
  options?: O
): InferReplyMarkupType<T> {
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

    markup.resized(keyboardOptions.resize);

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

  return markup as InferReplyMarkupType<T>;
}

// FIXME: doesn't work
export const removeInlineKeyboard = (ctx: Context): boolean => {
  if(ctx.message?.reply_markup) {
    ctx.editMessageReplyMarkup({reply_markup: new InlineKeyboard()});
    return true;
  }

  return false;
};
