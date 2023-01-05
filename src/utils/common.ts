import { KeyboardButtons } from "@/constants/buttons";
import { storeController } from "@/env";
import { start } from "@/scripts/commands";
import { ButtonImage, ControlButtons, MessageProps } from "@/types/lib";
import { UserId } from "@/types/user";
import { Context, InlineKeyboard } from "grammy";
import { formatCountLabel } from "./formatters";
import { createKeyboard, removeInlineKeyboard } from "./keyboard";

/**
 * Returns array of values reached with the given key as prop
 *
 * @example
 * ```typescript
 * const array = [
 *    {value1: "1", value2: "2"},
 *    {value1: "3", value2: "4"}
 * ];
 * const values = getObjectPropArray(array, "value1"); // ["1", "3"]
 * ```
 *
 * @param {T[]} objectList - array of objects
 * @param {K} prop - the key to extract values with
 * @returns {T[K][]} array of values
 */
export const getObjectPropArray = <T extends object, K extends keyof T>(objectList: T[], prop: K): T[K][] => {
  return Object.values(objectList).map(object => object[prop]) ?? [];
};

/**
 * Throws an error if user is not added
 */
export const checkIfUserExists = (userId: UserId): void => {
  if(!storeController.userExists(userId)) {
    throw new Error(`User with id ${userId} not found!`);
  }
};

export const computeControlsKeyboard = (userId: UserId): InlineKeyboard => {
  const controls: ButtonImage[] = [
    // Default `go back` button
    KeyboardButtons.PREV,
    // Button, which must not be handled, that indicates current step
    {value: "_count", label: formatCountLabel(storeController.getUserData(userId))},
    // Show `В меню` at the last step and `Далее` overwise
    storeController.isLastStep(userId) ? KeyboardButtons.HUB : KeyboardButtons.NEXT
  ];

  return createKeyboard("inline", controls, {oneTime: true, columns: 3});
};

export const computeMessageProps = (userId: UserId): Required<MessageProps> & {reply_markup: InlineKeyboard} => {
  return  {
    reply_markup: computeControlsKeyboard(userId),
    parse_mode: "MarkdownV2"
  };
};

export const isFirstStep = (userId: UserId): boolean => {
  return storeController.getUserData(userId).step === 0;
};

export const takeControlButtonAction = (ctx: Context, button: ControlButtons, userId: UserId, ) => {
  switch(button) {
    case ControlButtons.NEXT:
      storeController.nextStep(userId);
      removeInlineKeyboard(ctx);
      break;
    case ControlButtons.PREV:
      storeController.prevStep(userId);
      removeInlineKeyboard(ctx);
      break;
    case ControlButtons.HUB:
      storeController.removeUser(userId);
      removeInlineKeyboard(ctx);
      start(ctx);
      break;
  }
};
