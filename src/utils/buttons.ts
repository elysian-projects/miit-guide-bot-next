import { MAX_BUTTON_COLUMN_SIZE, RESIZE_BUTTONS } from "@/constants/buttons";
import { ButtonCreatorOptions, HideableKBtn, InlineButtonImage } from "@/types/lib";
import { Markup } from "telegraf";
import { InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyKeyboardRemove } from "telegraf/typings/core/types/typegram";

/**
 * Creates and returns a menu button
 */
const createMenuButton = (text: string): HideableKBtn => {
  return {text};
};

/**
 * Creates and returns an inline button
 */
const createInlineButton = (image: InlineButtonImage): InlineKeyboardButton => {
  return {
    text: image.label,
    callback_data: image.value,
  };
};

/**
 * Creates a menu keyboard markup, adds given buttons there and returns it
 *
 * @param {string[]} buttons: array of strings to be shown as buttons
 * @param {ButtonCreatorOptions} options: optional settings to change the way buttons outlook
 * @returns {ReplyKeyboardMarkup}
 */
export const createMenuKeyboardMarkup = (buttons: string[], options: ButtonCreatorOptions = {}): ReplyKeyboardMarkup => {
  const markup = Markup.keyboard(
    buttons.map(button => createMenuButton(button)),
    {columns: options.columns ?? MAX_BUTTON_COLUMN_SIZE}
  );

  markup.resize(options.resize ?? RESIZE_BUTTONS);
  markup.selective(true);

  return markup.reply_markup;
};

/**
 * Creates an inline keyboard markup, adds given buttons there and returns it
 *
 * @param {InlineButtonImage} buttons: array of buttons images (object with specific fields) to be shown as inline buttons
 * @returns {InlineKeyboardMarkup}
 */
export const createInlineKeyboardMarkup = (buttons: InlineButtonImage[]): InlineKeyboardMarkup => {
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
