import { InlineKeyboardOptions, MenuKeyboardOptions } from "@/types/lib";

export const keyboardDefaultOptions: Required<InlineKeyboardOptions & MenuKeyboardOptions> = {
  columns: 3,
  selective: true,
  oneTime: false,
  resize: true,
};
