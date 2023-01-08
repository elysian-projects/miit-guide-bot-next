import { KeyboardButtons } from "@/constants/buttons";
import { storeController } from "@/env";
import { start } from "@/scripts/commands";
import { StepInformation } from "@/types/common";
import { ContentNode, WithLinks, WithPicture } from "@/types/content";
import { ButtonImage, ControlButtons, MessageProps } from "@/types/lib";
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
  if(!storeController.userExists(userId)) {
    throw new Error(`User with id ${userId} not found!`);
  }
};

export function computeControlsKeyboard(type: "menu", options: {currentStep: number, maxSteps: number}): Keyboard;
export function computeControlsKeyboard(type: "inline", options: {currentStep: number, maxSteps: number}): InlineKeyboard;
export function computeControlsKeyboard(type: any, options: {currentStep: number, maxSteps: number}): any {
  const {currentStep, maxSteps} = options;
  const controls: ButtonImage[] = [];

  // First button: menu keyboard cannot have a `Go back` button unlike inline keyboard
  type === "inline"
    ? controls.push(KeyboardButtons.PREV)
    : controls.push(KeyboardButtons.HUB);

  // Middle button: represents steps in a format of `1/3`, where `1` - current step, `3` - last available step
  // controls.push(createButtonImage(formatCountLabel(currentStep, maxSteps), "_count"));

  // Last button:
  (currentStep !== maxSteps - 1) ? controls.push(KeyboardButtons.NEXT) : null;

  return createKeyboard(type, controls, {oneTime: true, columns: 3});
};

export const takeControlButtonAction = (ctx: Context, button: ControlButtons, userId: UserId, ) => {
  switch(button) {
    case ControlButtons.NEXT || KeyboardButtons.NEXT.label:
      storeController.getUser(userId).nextStep();
      removeInlineKeyboard(ctx);
      break;
    case ControlButtons.PREV || KeyboardButtons.PREV.label:
      storeController.getUser(userId).prevStep();
      removeInlineKeyboard(ctx);
      break;
    case ControlButtons.HUB || KeyboardButtons.HUB.label:
      storeController.removeUser(userId);
      removeInlineKeyboard(ctx);
      start(ctx);
      break;
  }
};

export function getMessageProps (type: "menu", options: StepInformation): MessageProps<Keyboard>;
export function getMessageProps (type: "inline", options: StepInformation): MessageProps<InlineKeyboard>;
export function getMessageProps (type: any, options: StepInformation): MessageProps<any> {
  return {
    parse_mode: "Markdown",
    reply_markup: computeControlsKeyboard(type, options)
  }
}

/**
 * @internal
 */
type UseMessageControllerReturnType<K extends Keyboard | InlineKeyboard = any> = {
  message: string,
  props: K extends any ? any : MessageProps<K>,
  isFirstStep: boolean,
  isLastStep: boolean,
  currentContent: ContentNode & Partial<WithPicture> & Partial<WithLinks>
}
export function useMessageController (replyMarkupType: "menu", userId: UserId): UseMessageControllerReturnType<Keyboard>;
export function useMessageController (replyMarkupType: "inline", userId: UserId): UseMessageControllerReturnType<InlineKeyboard>;
export function useMessageController (replyMarkupType: any, userId: UserId): UseMessageControllerReturnType {
  const user = storeController.getUser(userId)
  const currentContent = user.getCurrentContent();

  const options = {currentStep: user.getData().step, maxSteps: user.getData().content.length};

  const message = formatMessage(currentContent, options);
  const props = getMessageProps(replyMarkupType, options);

  return {
    message,
    props,
    currentContent,
    isFirstStep: user.isFirstStep(),
    isLastStep: user.isLastStep(),
  }
}