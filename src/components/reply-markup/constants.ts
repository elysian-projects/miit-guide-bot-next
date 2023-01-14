import { InlineKeyboardOptions, MenuKeyboardOptions } from "./types";

export const keyboardDefaultOptions: Required<InlineKeyboardOptions & MenuKeyboardOptions> = {
  columns: 2,
  selective: false,
  oneTime: false,
  resize: true,
  placeholder: ""
};
