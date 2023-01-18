import { Image } from "@/types/common";
import { Menu } from "@grammyjs/menu";
import { Context, InlineKeyboard, Keyboard } from "grammy";
import { defaultMenuKeyboardOptions } from "./constants";
import {
  InferReplyMarkupType,
  InlineKeyboardOptions, KeyboardClickHandler, KeyboardType,
  MenuKeyboardOptions
} from "./types";
import { addButtons, applyPropsToMarkup, computeButtonProps, createMarkup, shouldBreakColumn } from "./utils";

/**
 * Creates a keyboard markup, adds given buttons there and returns it. It's recommended to
 * use `Menu` for inline keyboards as they are more predictable and easier to handle
 *
 * @param {KeyboardType} type: type of the keyboard
 * @param {ButtonImage[]} buttons: array of button images to be shown as buttons
 * @param {MenuKeyboardOptions | InlineKeyboardOptions} options: optional settings to change the way buttons look
 * @returns {ReplyMarkupType}
 */
export function createKeyboard<
  T extends KeyboardType,
  O extends (T extends "menu" ? MenuKeyboardOptions : InlineKeyboardOptions)
>(type: T, buttons: Image[], options?: O): InferReplyMarkupType<T> {

  if(buttons.length === 0) {
    throw new Error("No buttons for menu keyboard given!");
  }

  const markup = (type === "menu")
    ? createMenuKeyboard(options ?? defaultMenuKeyboardOptions)
    : createInlineKeyboard();

  addButtons(markup, buttons, options?.columns ?? defaultMenuKeyboardOptions.columns);

  return markup as InferReplyMarkupType<T>;
}

const createMenuKeyboard = (options: MenuKeyboardOptions): Keyboard => {
  const markup = createMarkup("menu");

  applyPropsToMarkup(markup, computeButtonProps("menu", options));

  return markup;
};

const createInlineKeyboard = (): InlineKeyboard => {
  return createMarkup("inline");
};

// Function-handler that returns array of images
type ComputeImage = () => Image[];

export const createMenu = (id: string, buttons: Image[] | ComputeImage, handler: KeyboardClickHandler, options?: InlineKeyboardOptions): Menu => {
  const {columns, oneTime} = computeButtonProps("inline", options);

  const menu = new Menu(id);

  const menuButtons = (typeof buttons === "function")
    ? buttons()
    : buttons;

  menuButtons.forEach((button, index) => {
    menu.text({text: button.label, payload: button.value}, ctx => {

      // Call default tab click handler
      handler(ctx, ctx.match);
      // Remove the keyboard on click after handler works out
      oneTime && removeInlineKeyboard(ctx);
    });
    // Break to new line
    shouldBreakColumn(index, columns) && menu.row();
  });

  return menu;
};

/**
 * Removes inline markup from from the previously sent message,
 * if the previous message did not have inline markup, throws an error
 * @param {Context} ctx - the message context provided by the Telegram API
 */
export const removeInlineKeyboard = (ctx: Context): void => {
  if(!ctx.msg?.reply_markup) {
    throw new Error("Cannot remove inline keyboard!");
  }
  ctx.editMessageReplyMarkup({reply_markup: new InlineKeyboard()});
};