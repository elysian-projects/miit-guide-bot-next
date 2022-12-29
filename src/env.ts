import { EventController } from "@/controllers/eventController";
import { Context } from "grammy";
import { Tabs } from "./types/tabs";
import { createKeyboard } from "./utils/keyboard";

export const eventController = new EventController();

/**
 * Init locations
 */
export const locations = {
  street: {value: "street", label: "Улица"},
  building1: {value: "building1", label: "Корпус 1"},
};

const excursionHandler = (ctx: Context) => {
  ctx.reply(tabs.excursion.description, {reply_markup: tabs.excursion.buttons});
};

const miitWar = (ctx: Context) => {
  ctx.reply(tabs.ww2.description, {reply_markup: tabs.ww2.buttons});
};

export const tabs: Tabs = {
  excursion: {
    label: "Экскурсия",
    description: "Экскурсия по памятникам МИИТ",
    buttons: createKeyboard("inline", [{label: "Кнопка", value: "button"}]),
    handler: excursionHandler
  },
  ww2: {
    label: "МИИТ в годы ВОВ",
    description: "Статья о МИИТ в годы ВОВ",
    buttons: createKeyboard("inline", [{label: "Кнопка", value: "button"}]),
    handler: miitWar
  },
};
