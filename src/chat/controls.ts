import { Image } from "@/types/lib";

export enum ControlButtons {
  PREV = "PREV",
  NEXT = "NEXT",
  HUB = "HUB"
}

export const keyboardControls: {[key in ControlButtons]: Image} = {
  PREV: {value: "PREV", label: "Назад"},
  NEXT: {value: "NEXT", label: "Далее"},
  HUB: {value: "HUB", label: "В меню"},
};
