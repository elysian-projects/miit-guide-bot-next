import { createKeyboard } from "./components/reply-markup";
import { StoreController } from "./controllers/storeController";
import { Tab, TabsList } from "./external/tabs/types";
import { excursionMenu } from "./scripts/handlers/menus";

export const storeController = new StoreController();

export const tabsData: {[key in TabsList]: Tab} = {
  excursion: {
    label: "Экскурсия",
    value: "excursion",
    content: "Экскурсия по памятникам МИИТ",
    replyMarkup: excursionMenu
  },
  ww2: {
    label: "МИИТ в годы ВОВ",
    value: "ww2",
    content: "Статья о МИИТ в годы ВОВ",
    replyMarkup: createKeyboard("inline", [{label: "Кнопка", value: "button"}])
  },
};
