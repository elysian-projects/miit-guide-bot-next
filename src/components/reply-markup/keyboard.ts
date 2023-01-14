import { getImageLabelByValue } from "@/external/utils";
import { StaticImplements } from "@/types/common";
import { IExternalEntityController } from "@/types/controllers";
import { ButtonImage, ButtonsList } from "./types";

const keyboardButtons: ButtonImage[] = [
  {value: "NEXT", label: "Далее"},
  {value: "PREV", label: "Назад"},
  {value: "HUB", label: "В меню"},
];

@StaticImplements<IExternalEntityController<ButtonsList, ButtonImage>>()
export class KeyboardController {
  public static getLabels = (): string[] => {
    return keyboardButtons.map(button => button.label);
  };

  public static getValues = (): ButtonsList[] => {
    return keyboardButtons.map(button => button.value);
  };

  public static getImages = (): ButtonImage[] => {
    return [...keyboardButtons];
  };

  public static getLabelByValue = (value: ButtonsList): string => {
    return getImageLabelByValue(keyboardButtons, value);
  };

  public static getImageByValue = (value: ButtonsList): ButtonImage => {
    // This method will always return a valid image as types are strictly determined
    return keyboardButtons.find(button => button.value === value) || {value, label: "unknown"};
  };
}
