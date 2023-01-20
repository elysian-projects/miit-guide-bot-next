import { storeController } from "@/bootstrap";
import { keyboardControls } from "@/chat/controls";
import { createReplyMarkup } from "@/components/reply-markup";
import { Image, KeyboardType, MessageProps, ReplyMarkupType } from "@/types/lib";
import { ChatId, StepInformation, UserDataContent } from "@/types/user";
import { formatMessage } from "@/utils/formatters";

/**
 * Throws an error if user is not added
 */
export const checkUserExists = (chatId: ChatId): void => {
  if (!storeController.userExists(chatId)) {
    throw new Error(`User with id ${chatId} not found!`);
  }
};

export function useMessageController<T extends KeyboardType>(replyMarkupType: T, chatId: ChatId): {
  message: string,
  props: MessageProps<ReplyMarkupType[T]>,
  isFirstStep: boolean,
  isLastStep: boolean,
  content: UserDataContent
} {
  const user = storeController.getUser(chatId);

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

export function getMessageProps<T extends KeyboardType>(type: T, options: StepInformation): MessageProps<ReplyMarkupType[T]> {
  return {
    parse_mode: "Markdown",
    reply_markup: computeControlsKeyboard(type, options)
  };
}

export function computeControlsKeyboard<T extends KeyboardType>(type: T, options: StepInformation): ReplyMarkupType[T] {
  const {currentStep, maxSteps} = options;
  const controls: Image[] = [];

  // First button: menu keyboard cannot have a `Go back` button unlike inline keyboard
  (type === "inline")
    ? controls.push(keyboardControls.PREV)
    : controls.push(keyboardControls.HUB);

  // Last button: `Next step`, if there is a next step, overwise - `Back to hub`
  if(currentStep !== maxSteps - 1) {
    controls.push(keyboardControls.NEXT);
  } else if(type === "inline") {
    controls.push(keyboardControls.HUB);
  }

  return createReplyMarkup(type, controls, {columns: 3});
}
