import { KeyboardButtons } from "@/constants/buttons";
import { storeController } from "@/env";
import { start } from "@/scripts/commands";
import { InferReplyMarkupType, StepInformation } from "@/types/common";
import { ContentNode, WithLinks, WithPicture } from "@/types/content";
import { ButtonImage, ControlButtons, KeyboardType, MessageProps } from "@/types/lib";
import { UserId } from "@/types/user";
import { Context, InlineKeyboard, Keyboard } from "grammy";
import { formatMessage } from "./formatters";
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
  if (!storeController.userExists(userId)) {
    throw new Error(`User with id ${userId} not found!`);
  }
};

export function computeControlsKeyboard<T extends KeyboardType>(type: T, options: StepInformation): T extends "menu" ? Keyboard : InlineKeyboard {
  const {currentStep, maxSteps} = options;
  const controls: ButtonImage[] = [];

  // First button: menu keyboard cannot have a `Go back` button unlike inline keyboard
  type === "inline"
    ? controls.push(KeyboardButtons.PREV)
    : controls.push(KeyboardButtons.HUB);

  // Middle button: represents steps in a format of `1/3`, where `1` - current step, `3` - last available step
  // type === "inline" ?? controls.push(createButtonImage(formatCountLabel(currentStep, maxSteps), "_count"));

  // Last button: `Next step`, if there is a next step, overwise - `Back to hub`
  if(currentStep !== maxSteps - 1) {
    controls.push(KeyboardButtons.NEXT);
  } else if(type === "inline") {
    controls.push(KeyboardButtons.HUB);
  }

  return createKeyboard(type, controls, {oneTime: true, columns: 3});
}

export const takeControlButtonAction = (ctx: Context, button: ControlButtons, userId: UserId) => {
  switch (button) {
    case ControlButtons.NEXT:
    case KeyboardButtons.NEXT.label:
      storeController.getUser(userId).nextStep();
      removeInlineKeyboard(ctx);
      break;
    case ControlButtons.PREV:
    case KeyboardButtons.PREV.label:
      storeController.getUser(userId).prevStep();
      removeInlineKeyboard(ctx);
      break;
    case ControlButtons.HUB:
    case KeyboardButtons.HUB.label:
      storeController.removeUser(userId);
      removeInlineKeyboard(ctx);
      start(ctx);
      break;
  }
};

export function getMessageProps<T extends KeyboardType>(type: T, options: StepInformation): MessageProps<InferReplyMarkupType<T>> {
  return {
    parse_mode: "Markdown",
    reply_markup: computeControlsKeyboard(type, options)
  };
}

export function useMessageController<T extends KeyboardType>(replyMarkupType: T, userId: UserId): {
  message: string,
  props: MessageProps<InferReplyMarkupType<T>>,
  isFirstStep: boolean,
  isLastStep: boolean,
  content: ContentNode & Partial<WithPicture> & Partial<WithLinks>
} {
  const user = storeController.getUser(userId);
  const currentContent = user.getCurrentContent();

  const options = {
    currentStep: user.getData().step,
    maxSteps: user.getData().content.length
  };

  const message = formatMessage(currentContent, options);
  const props = getMessageProps(replyMarkupType, options);

  return {
    message,
    props,
    content: currentContent,
    isFirstStep: user.isFirstStep(),
    isLastStep: user.isLastStep(),
  };
}
