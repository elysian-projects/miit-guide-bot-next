import { EventController } from "@/controllers/eventController";
import { excursionHandler } from "./scripts/tabs/excursion";
import { miitWar } from "./scripts/tabs/ww2";
import { ButtonImage } from "./types/lib";
import { Tabs } from "./types/tabs";
import { createKeyboard } from "./utils/keyboard";
import { createButtonImages } from "./utils/tabs";

export const eventController = new EventController();

/**
 * Init locations
 */
export const locations = {
  street: {value: "street", label: "Улица"},
  building1: {value: "building1", label: "Корпус 1"},
};

/**
 * Init tabs
 */
export const tabs: Tabs = {
  excursion: {
    label: "Экскурсия",
    reply: "Экскурсия по памятникам МИИТ",
    buttons: createKeyboard("inline", createButtonImages(locations as Record<string, ButtonImage>)),
    onClick: excursionHandler
  },
  ww2: {
    label: "МИИТ в годы ВОВ",
    reply: "Статья о МИИТ в годы ВОВ",
    buttons: createKeyboard("inline", [{label: "Кнопка", value: "button"}]),
    onClick: miitWar
  },
};
