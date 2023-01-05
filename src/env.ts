import { StoreController } from "./controllers/storeController";
import { excursionHandler } from "./scripts/tabs/excursion";
import { miitWar } from "./scripts/tabs/ww2";
import { LocationImage, LocationsList } from "./types/location";
import { TabImage, Tabs, TabsList } from "./types/tabs";
import { createKeyboard } from "./utils/keyboard";

export const storeController = new StoreController();

export const tabsList: TabsList[] = ["excursion", "ww2"];
export const locationsList: LocationsList[] = ["building1", "street"];

/**
 * Init locations
 */
export const locationsImage: LocationImage[] = [
  {value: "street", label: "Улица"},
  {value: "building1", label: "Корпус 1"},
];

export const tabsImage: TabImage[] = [
  {value: "excursion", label: "Экскурсия"},
  {value: "ww2", label: "МИИТ в годы ВОВ"},
];

/**
 * Init tabs
 */
export const tabsData: Tabs = {
  excursion: {
    label: "Экскурсия",
    content: "Экскурсия по памятникам МИИТ",
    replyMarkup: createKeyboard("inline", locationsImage),
    onClick: excursionHandler
  },
  ww2: {
    label: "МИИТ в годы ВОВ",
    content: "Статья о МИИТ в годы ВОВ",
    replyMarkup: createKeyboard("inline", [{label: "Кнопка", value: "button"}]),
    onClick: miitWar
  },
};
