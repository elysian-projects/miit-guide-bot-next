import { storeController } from "@/env";
import { StepInformation } from "@/types/common";
import { ContentNode, WithLinks, WithPicture } from "@/types/content";
import { MessageProps } from "@/types/lib";
import { UserId } from "@/types/user";
import { formatMessage } from "@/utils/formatters";
import { InlineKeyboard, Keyboard } from "grammy";
import { ButtonImage, createKeyboard, InferReplyMarkupType, KeyboardController, KeyboardType } from "../reply-markup";

/**
 * Throws an error if user is not added
 */
export const checkUserExists = (userId: UserId): void => {
  if (!storeController.userExists(userId)) {
    throw new Error(`User with id ${userId} not found!`);
  }
};

export function useMessageController<T extends KeyboardType>(replyMarkupType: T, userId: UserId): {
  message: string,
  props: MessageProps<InferReplyMarkupType<T>>,
  isFirstStep: boolean,
  isLastStep: boolean,
  content: ContentNode & Partial<WithPicture> & Partial<WithLinks>
} {
  const user = storeController.getUser(userId);

  const options = {
    currentStep: user.getData().step,
    maxSteps: user.getData().content.length
  };

  const content = user.getCurrentContent();

  return {
    message: formatMessage(content, options),
    props: getMessageProps(replyMarkupType, options),
    content,
    isFirstStep: user.isFirstStep(),
    isLastStep: user.isLastStep(),
  };
}

export function getMessageProps<T extends KeyboardType>(type: T, options: StepInformation): MessageProps<InferReplyMarkupType<T>> {
  return {
    parse_mode: "Markdown",
    reply_markup: computeControlsKeyboard(type, options)
  };
}

export function computeControlsKeyboard<T extends KeyboardType>(type: T, options: StepInformation): T extends "menu" ? Keyboard : InlineKeyboard {
  const {currentStep, maxSteps} = options;
  const controls: ButtonImage[] = [];

  // First button: menu keyboard cannot have a `Go back` button unlike inline keyboard
  type === "inline"
    ? controls.push(KeyboardController.getImageByValue("PREV"))
    : controls.push(KeyboardController.getImageByValue("HUB"));

  // Last button: `Next step`, if there is a next step, overwise - `Back to hub`
  if(currentStep !== maxSteps - 1) {
    controls.push(KeyboardController.getImageByValue("NEXT"));
  } else if(type === "inline") {
    controls.push(KeyboardController.getImageByValue("HUB"));
  }

  return createKeyboard(type, controls, {oneTime: true, columns: 3});
}