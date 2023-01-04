import { ButtonImage, ControlButtons, InlineKeyboardOptions, MenuKeyboardOptions } from "@/types/lib";

export const keyboardDefaultOptions: Required<InlineKeyboardOptions & MenuKeyboardOptions> = {
  columns: 2,
  selective: false,
  oneTime: false,
  resize: true,
  placeholder: ""
};

// Key of the object must match the `value` prop of the button
// TODO: get rid of the unused `value` property
export const KeyboardButtons: Record<ControlButtons, ButtonImage> = {
  NEXT: {value: "NEXT", label: "Далее"},
  PREV: {value: "PREV", label: "Назад"},
  HUB: {value: "HUB", label: "В меню"},
};
