import { menuButtonKeyboardDefaultOptions } from "@/constants/buttons";
import { ButtonImage, MenuButtonOptions } from "@/types/lib";
import { Markup } from "telegraf";
import { InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyKeyboardRemove } from "telegraf/typings/core/types/typegram";

/**
 * Creates and returns an inline button
 * @private
 */
const createInlineButton = (image: ButtonImage): InlineKeyboardButton => {
  return {
    text: image.label,
    callback_data: image.value,
  };
};

/**
 * Calculates and returns the column size for buttons
 * @private
 */
const calculateButtonColumnSize = (column?: number) => {
  return Math.max(column ?? -1, menuButtonKeyboardDefaultOptions.columns);
};

/**
 * Creates a menu keyboard markup, adds given buttons there and returns it
 *
 * @param {string[]} buttons: array of strings to be shown as buttons
 * @param {ButtonCreatorOptions} options: optional settings to change the way buttons outlook
 * @returns {ReplyKeyboardMarkup}
 */
export const createMenuKeyboardMarkup = (buttons: ButtonImage[], options: MenuButtonOptions = {}): ReplyKeyboardMarkup => {
  if(buttons.length === 0) {
    throw new Error("No buttons for menu keyboard given!");
  }

  const keyboardOptions = {
    ...menuButtonKeyboardDefaultOptions,
    ...options,
    columns: calculateButtonColumnSize(options.columns)
  };

  const markup = Markup.keyboard(buttons.map(button => button.label), {columns: keyboardOptions.columns});

  markup.resize(options.resize);
  markup.selective(options.selective);
  markup.oneTime(options.oneTime);

  return markup.reply_markup;
};

/**
 * Creates an inline keyboard markup, adds given buttons there and returns it
 *
 * @param {ButtonImage} buttons: array of buttons images (object with specific fields) to be shown as inline buttons
 * @returns {InlineKeyboardMarkup}
 */
export const createInlineKeyboardMarkup = (buttons: ButtonImage[]): InlineKeyboardMarkup => {
  const markup = Markup.inlineKeyboard(
    buttons.map(button => createInlineButton(button))
  );

  return markup.reply_markup;
};

/**
 * Creates and returns a (menu) keyboard remove markup
 *
 * @returns {ReplyKeyboardRemove}
 */
export const createRemoveKeyboardMarkup = (): ReplyKeyboardRemove => {
  return Markup.removeKeyboard().reply_markup;
};
