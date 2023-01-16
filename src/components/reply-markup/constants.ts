import { InlineKeyboardOptions, KeyboardOptions, MenuKeyboardOptions } from "./types";

const defaultKeyboardOptions: Required<KeyboardOptions> = {
  columns: 2,
  oneTime: false
};

export const defaultInlineKeyboardOptions: Required<InlineKeyboardOptions> = {
  ...defaultKeyboardOptions
};

export const defaultMenuKeyboardOptions: Required<MenuKeyboardOptions> = {
  ...defaultKeyboardOptions,
  selective: false,
  resize: true,
  placeholder: ""
};
