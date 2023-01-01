// import { keyboardDefaultOptions } from "@/constants/buttons";
import { ButtonImage } from "@/types/lib";
import { createKeyboard } from "@/utils/keyboard";
import { describe, expect, test } from "@jest/globals";
import { InlineKeyboard, Keyboard } from "grammy";

const buttons: ButtonImage[] = [{value: "Button 1", label: "Button 1"}, {value: "Button 2", label: "Button 2"}, {value: "Button 3", label: "Button 3"}];

describe("menu keyboard", () => {
  test("should create a valid menu keyboard with default props", () => {
    const testMarkup = createKeyboard("menu", buttons);
    const libMarkup = new Keyboard().text(buttons[0].label).text(buttons[1].label).text(buttons[2].label).row().resized();

    expect(testMarkup).toEqual(libMarkup);
  });

  test("should create a valid inline keyboard with default props", () => {
    const testMarkup = createKeyboard("inline", buttons);
    const libMarkup = new InlineKeyboard();

    buttons.forEach((button) => {
      libMarkup.text(button.label, button.value);
    });
    libMarkup.row();

    expect(testMarkup).toEqual(libMarkup);
  });

  test("should throw error on empty button list given", () => {
    expect(() => {
      createKeyboard("menu", []);
    }).toThrowError();
  });

  test("should create a valid menu keyboard with `columns` prop", () => {
    const testMarkup = createKeyboard("menu", buttons, {columns: 1});
    const libMarkup = new Keyboard().text(buttons[0].label).row().text(buttons[1].label).row().text(buttons[2].label).row().resized();

    expect(testMarkup).toEqual(libMarkup);
  });

  test("should create a valid inline keyboard with `columns` prop", () => {
    const testMarkup = createKeyboard("inline", buttons, {columns: 1});
    const libMarkup = new InlineKeyboard().text(buttons[0].label).row().text(buttons[1].label).row().text(buttons[2].label).row();

    expect(testMarkup).toEqual(libMarkup);
  });

  test("should create a valid menu keyboard markup with `resize` prop", () => {
    const testMarkupResize = createKeyboard("menu", buttons, {resize: true});
    const libMarkupResize = new Keyboard().text(buttons[0].label).text(buttons[1].label).text(buttons[2].label).row().resized();
    expect(testMarkupResize).toEqual(libMarkupResize);

    const testMarkupNoResize = createKeyboard("menu", buttons, {resize: false});
    const libMarkupNoResize = new Keyboard().text(buttons[0].label).text(buttons[1].label).text(buttons[2].label).row();
    expect(testMarkupNoResize).toEqual(libMarkupNoResize);
  });

  test("should create a valid menu keyboard markup with `oneTime` prop", () => {
    const testMarkupOneTime = createKeyboard("menu", buttons, {oneTime: true});
    const libMarkupOneTime = new Keyboard().text(buttons[0].label).text(buttons[1].label).text(buttons[2].label).row().resized().oneTime();
    expect(testMarkupOneTime).toEqual(libMarkupOneTime);

    const testMarkupNoOneTime = createKeyboard("menu", buttons, {resize: false});
    const libMarkupNoOneTime = new Keyboard().text(buttons[0].label).text(buttons[1].label).text(buttons[2].label).row();
    expect(testMarkupNoOneTime).toEqual(libMarkupNoOneTime);
  });

  test("should create a valid menu keyboard markup with `placeholder` prop", () => {
    const placeholder = "Some placeholder";

    const testMarkupPlaceholder = createKeyboard("menu", buttons, {placeholder});
    const libMarkupPlaceholder = new Keyboard().text(buttons[0].label).text(buttons[1].label).text(buttons[2].label).row().resized().placeholder(placeholder);
    expect(testMarkupPlaceholder).toEqual(libMarkupPlaceholder);
  });

  test("should create a valid menu keyboard markup with `selective` prop", () => {
    const testMarkupSelective = createKeyboard("menu", buttons, {selective: true});
    const libMarkupSelective = new Keyboard().text(buttons[0].label).text(buttons[1].label).text(buttons[2].label).row().resized().selected();
    expect(testMarkupSelective).toEqual(libMarkupSelective);

    const testMarkupNoSelective = createKeyboard("menu", buttons, {selective: false});
    const libMarkupNoSelective = new Keyboard().text(buttons[0].label).text(buttons[1].label).text(buttons[2].label).row().resized();
    expect(testMarkupNoSelective).toEqual(libMarkupNoSelective);
  });
});
