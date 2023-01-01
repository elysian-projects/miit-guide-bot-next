import { ButtonImage, InlineKeyboardOptions, MenuKeyboardOptions } from "@/types/lib";

export const keyboardDefaultOptions: Required<InlineKeyboardOptions & MenuKeyboardOptions> = {
  columns: 3,
  selective: false,
  oneTime: false,
  resize: true,
  placeholder: ""
};

// Key of the object must match the `value` prop of the button
export const Keyboard: {[key: string]: ButtonImage} = {
  NEXT: {value: "NEXT", label: "Далее"},
  HUB: {value: "HUB", label: "В меню"},
};
