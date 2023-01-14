import { createKeyboard } from "./components/reply-markup";
import { StoreController } from "./controllers/storeController";
import { LocationsController } from "./external/locations";
import { Tab, TabsList } from "./external/tabs/types";
import { excursionHandler } from "./scripts/tabs/excursion";
import { miitWar } from "./scripts/tabs/ww2";

export const storeController = new StoreController();

/**
 * Init tabs
 */
export const tabsData: {[key in TabsList]: Tab} = {
  excursion: {
    label: "Экскурсия",
    content: "Экскурсия по памятникам МИИТ",
    replyMarkup: createKeyboard("inline", LocationsController.getImages()),
    onClick: excursionHandler
  },
  ww2: {
    label: "МИИТ в годы ВОВ",
    content: "Статья о МИИТ в годы ВОВ",
    replyMarkup: createKeyboard("inline", [{label: "Кнопка", value: "button"}]),
    onClick: miitWar
  },
};
