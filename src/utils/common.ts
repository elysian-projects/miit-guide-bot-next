import { KeyboardButtons } from "@/constants/buttons";
import { storeController } from "@/env";
import { ButtonImage, MessageProps } from "@/types/lib";
import { UserId } from "@/types/user";
import { InlineKeyboard } from "grammy";
import { formatCountLabel } from "./formatters";
import { createKeyboard } from "./keyboard";

/**
 * Throws an error if user is not added
 */
export const checkIfUserExists = (userId: UserId): void => {
  if(!storeController.userExists(userId)) {
    throw new Error(`User with id ${userId} not found!`);
  }
};

export const computeKeyboard = (userId: UserId): InlineKeyboard => {
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
    reply_markup: computeKeyboard(userId),
    parse_mode: "MarkdownV2"
  };
};

export const isFirstStep = (userId: UserId): boolean => {
  return storeController.getUserData(userId).step === 0;
};
