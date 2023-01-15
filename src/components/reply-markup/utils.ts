import { Image } from "@/types/common";
import { Context, InlineKeyboard, Keyboard } from "grammy";
import { keyboardDefaultOptions } from "./constants";
import { InferReplyMarkupType, InlineKeyboardOptions, KeyboardOptions, KeyboardType, MenuKeyboardOptions, ReplyMarkupType } from "./types";

/**
 * Creates a keyboard markup, adds given buttons there and returns it
 *
 * @param {KeyboardType} type: type of the keyboard
 * @param {ButtonImage[]} buttons: array of button images to be shown as buttons
 * @param {MenuKeyboardOptions | InlineKeyboardOptions} options: optional settings to change the way buttons look
 * @returns {ReplyMarkupType}
 */
export function createKeyboard<
  T extends KeyboardType,
  O extends (T extends "menu" ? MenuKeyboardOptions : InlineKeyboardOptions)
>
(type: T, buttons: Image[], options?: O): InferReplyMarkupType<T> {
  if(buttons.length === 0) {
    throw new Error("No buttons for menu keyboard given!");
  }

  const keyboardOptions = computeButtonProps(options);
  const markup = (type === "menu")
    ? new Keyboard()
    : new InlineKeyboard();

    addButtons(markup, buttons, keyboardOptions.columns);
    applyPropsToMarkup(markup, keyboardOptions);

  return markup as InferReplyMarkupType<T>;
}

/**
 * Returns `true` if the given index is on the edge of the column size, `false` otherwise
 * @internal
 * @param {number} index - index of the current button
 * @param {number} columns - column size
 * @returns {boolean}
 */
const shouldBreakColumn = (index: number, columnWidth: number) => {
  return (index + 1) % columnWidth === 0;
};

/**
 * Adds buttons from images to the `mutable` markup
 * @internal
 * @param {ReplyMarkupType} markup - `mutable` markup
 * @param {Image[]} buttons - list of button images
 * @param {number} columnWidth - amount of columns
 */
const addButtons = (markup: ReplyMarkupType, buttons: Image[], columnWidth: number) => {
  buttons.forEach((button, index) => {
    markup.text(button.label, button.value);
    shouldBreakColumn(index, columnWidth) ?? markup.row();
  });
};

/**
 * Computes button props from given options
 * @internal
 * @param {MenuKeyboardOptions | InlineKeyboardOptions} options - options for button
 * @returns {Required<KeyboardOptions & MenuKeyboardOptions>}
 */
const computeButtonProps = (options?: KeyboardOptions): Required<KeyboardOptions & MenuKeyboardOptions> => {
  return {
    ...keyboardDefaultOptions,
    ...options,
    columns: calculateButtonColumnSize(options?.columns)
  };
};

const applyPropsToMarkup = <T extends ReplyMarkupType, O extends (T extends Keyboard ? MenuKeyboardOptions : InlineKeyboardOptions)>(markup: T, options: O): void => {
  if(markup instanceof Keyboard) {
    const {oneTime, placeholder, resize, selective} = options as MenuKeyboardOptions;

    oneTime && markup.oneTime();
    selective && markup.selected(true);
    placeholder && markup.placeholder(placeholder);

    markup.resized(resize);
  } else {
    // TODO: add props to an inline markup
  }
};

/**
 * Calculates and returns the column size for buttons
 * @internal
 * @param {number} column? - given column size from props
 * @returns {number}
 */
const calculateButtonColumnSize = (column?: number) => {
  return column ?? keyboardDefaultOptions.columns;
};

export const removeInlineKeyboard = (ctx: Context): boolean => {
  if(ctx.message?.reply_markup) {
    ctx.editMessageReplyMarkup({reply_markup: new InlineKeyboard()});
    return true;
  }

  return false;
};
