import { menuButtonKeyboardDefaultOptions } from "@/constants/buttons";
import { createMenuKeyboardMarkup } from "@/utils/buttons";
import { describe, expect, test } from "@jest/globals";
import { Markup } from "telegraf";

const buttons = ["Button 1", "Button 2", "Button 3"];

describe("menu keyboard", () => {
  test("should create a valid menu keyboard markup with default props", () => {
    const testMarkup = createMenuKeyboardMarkup(buttons);
    const libMarkup = Markup.keyboard(buttons, {columns: menuButtonKeyboardDefaultOptions.columns});

    expect(testMarkup).toEqual(libMarkup.reply_markup);
  });

  test("should throw error on empty button list given", () => {
    expect(() => {
      createMenuKeyboardMarkup([]);
    }).toThrowError();
  });

  test("should create a valid menu keyboard markup with `columns` prop", () => {
    const testMarkup = createMenuKeyboardMarkup(buttons, {columns: 5});
    const libMarkup = Markup.keyboard(buttons, {columns: 5});

    expect(testMarkup).toEqual(libMarkup.reply_markup);
    expect(testMarkup.selective).toEqual(libMarkup.reply_markup.selective);
    expect(testMarkup.resize_keyboard).toEqual(libMarkup.reply_markup.resize_keyboard);
    expect(testMarkup.one_time_keyboard).toEqual(libMarkup.reply_markup.one_time_keyboard);
  });

  test("should create a valid menu keyboard markup with `resize` prop", () => {
    const testMarkupResize = createMenuKeyboardMarkup(buttons, {resize: true});
    const libMarkupResize = Markup.keyboard(buttons);
    libMarkupResize.resize(true);

    const testMarkupNoResize = createMenuKeyboardMarkup(buttons, {resize: false});
    const libMarkupNoResize = Markup.keyboard(buttons);
    libMarkupNoResize.resize(false);

    expect(testMarkupResize).toEqual(libMarkupResize.reply_markup);
    expect(testMarkupResize.selective).toEqual(libMarkupResize.reply_markup.selective);
    expect(testMarkupResize.resize_keyboard).toEqual(libMarkupResize.reply_markup.resize_keyboard);
    expect(testMarkupResize.one_time_keyboard).toEqual(libMarkupResize.reply_markup.one_time_keyboard);

    expect(testMarkupNoResize).toEqual(libMarkupNoResize.reply_markup);
    expect(testMarkupNoResize.selective).toEqual(libMarkupNoResize.reply_markup.selective);
    expect(testMarkupNoResize.resize_keyboard).toEqual(libMarkupNoResize.reply_markup.resize_keyboard);
    expect(testMarkupNoResize.one_time_keyboard).toEqual(libMarkupNoResize.reply_markup.one_time_keyboard);
  });

  test("should create a valid menu keyboard markup with `oneTime` prop", () => {
    const testMarkupResize = createMenuKeyboardMarkup(buttons, {resize: true});
    const libMarkupResize = Markup.keyboard(buttons);
    libMarkupResize.resize(true);

    const testMarkupNoResize = createMenuKeyboardMarkup(buttons, {resize: false});
    const libMarkupNoResize = Markup.keyboard(buttons);
    libMarkupNoResize.resize(false);

    expect(testMarkupResize).toEqual(libMarkupResize.reply_markup);
    expect(testMarkupResize.selective).toEqual(libMarkupResize.reply_markup.selective);
    expect(testMarkupResize.resize_keyboard).toEqual(libMarkupResize.reply_markup.resize_keyboard);
    expect(testMarkupResize.one_time_keyboard).toEqual(libMarkupResize.reply_markup.one_time_keyboard);

    expect(testMarkupNoResize).toEqual(libMarkupNoResize.reply_markup);
    expect(testMarkupNoResize.selective).toEqual(libMarkupNoResize.reply_markup.selective);
    expect(testMarkupNoResize.resize_keyboard).toEqual(libMarkupNoResize.reply_markup.resize_keyboard);
    expect(testMarkupNoResize.one_time_keyboard).toEqual(libMarkupNoResize.reply_markup.one_time_keyboard);
  });
});
