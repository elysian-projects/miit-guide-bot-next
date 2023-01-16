import { handleControlClick, handleLocationClick, handleTabClick } from "@/scripts/handlers";
import { Image } from "@/types/common";
import { InlineKeyboard, Keyboard } from "grammy";
import { defaultInlineKeyboardOptions, defaultMenuKeyboardOptions } from "./constants";
import {
  KeyboardClickHandler,
  KeyboardContentType,
  KeyboardOptions, KeyboardType, MenuKeyboardOptions, ReplyMarkupType
} from "./types";

// Default handlers for tabs that must work out when the tab button is clicked
export const clickHandlers: {[key in KeyboardContentType]: KeyboardClickHandler} = {
  tabs: handleTabClick,
  locations: handleLocationClick,
  controls: handleControlClick,
};

export const applyPropsToMarkup = (markup: Keyboard, options: KeyboardOptions): void => {
  const {oneTime, placeholder, resize, selective} = options as MenuKeyboardOptions;

  oneTime && markup.oneTime();
  selective && markup.selected(true);
  placeholder && markup.placeholder(placeholder);

  markup.resized(resize);
};

export function createMarkup(type: "menu"): Keyboard;
export function createMarkup(type: "inline"): InlineKeyboard;
export function createMarkup(type: unknown): Keyboard | InlineKeyboard {
  return (type === "menu")
    ? new Keyboard()
    : new InlineKeyboard();
}

/**
 * Adds buttons from images to the `mutable` markup
 * @param {ReplyMarkupType} markup - `mutable` markup
 * @param {Image[]} buttons - list of button images
 * @param {number} columnWidth - amount of columns
 */
export const addButtons = (markup: ReplyMarkupType, buttons: Image[], columnWidth: number) => {
  buttons.forEach((button, index) => {
    markup.text(button.label, button.value);
    shouldBreakColumn(index, columnWidth) ?? markup.row();
  });
};

/**
 * Computes button props from given options
 * @internal
 * @param {MenuKeyboardOptions | InlineKeyboardOptions} options - options for button
 * @returns {KeyboardOptions | MenuKeyboardOptions}
 */
export const computeButtonProps = <
  T extends KeyboardType,
  K extends KeyboardOptions
>(type: T, options?: K): Required<K> => {
  return {
    ...getDefaultButtonProps(type),
    ...options,
    columns: calculateButtonColumnSize(options?.columns),
  } as unknown as Required<K>;
};

export function getDefaultButtonProps(type: KeyboardType): Required<MenuKeyboardOptions>;
export function getDefaultButtonProps(type: KeyboardType): Required<InlineKeyboard>;
export function getDefaultButtonProps(type: KeyboardType): unknown {
  return (type === "menu")
    ? defaultMenuKeyboardOptions
    : defaultInlineKeyboardOptions;
}

/**
 * Returns `true` if the given index is on the edge of the column size, `false` otherwise
 * @internal
 * @param {number} index - index of the current button
 * @param {number} columns - column size
 * @returns {boolean}
 */
export const shouldBreakColumn = (index: number, columnWidth: number) => {
  return (index + 1) % columnWidth === 0;
};

/**
 * Calculates and returns the column size for buttons
 * @internal
 * @param {number} column - given column size from props
 * @returns {number}
 */
export const calculateButtonColumnSize = (column?: number) => {
  return column ?? defaultMenuKeyboardOptions.columns;
};