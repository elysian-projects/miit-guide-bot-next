import { EventController } from "@/controllers/eventController";
import { Tabs } from "./types/tabs";
import { createInlineKeyboardMarkup } from "./utils/buttons";

export const eventController = new EventController();

/**
 * Init locations
 */
export const locations = {
  street: {value: "street", label: "Улица"},
  building1: {value: "building1", label: "Корпус 1"},
};

export const tabs: Tabs = {
  excursion: {
    label: "Экскурсия",
    description: "Текст",
    buttons: createInlineKeyboardMarkup([{label: "Кнопка", value: "button"}])
  },
  ww2: {
    label: "МИИТ в годы ВОВ",
    description: "Текст",
    buttons: createInlineKeyboardMarkup([{label: "Кнопка", value: "button"}])
  },
};
