import { store } from "@/bootstrap";
import { ContentNode, FlatContent } from "@/common";
import { createReplyMarkup } from "@/components/reply-markup";
import { keyboardControls } from "@/constants/controls";
import { Image, KeyboardType, MessageProps, ReplyMarkupType } from "@/types/lib";
import { ChatId, StepInformation } from "@/types/user";
import { formatMessage } from "@/utils/formatters";

/**
 * Throws an error if user is not added
 * // TODO: remove error throwing, add user instead
 */
export const checkUserExists = (chatId: ChatId): void => {
  if (!store.userExists(chatId)) {
    throw new Error(`User with id ${chatId} not found!`);
  }
};

export function useMessageController<T extends KeyboardType>(replyMarkupType: T, chatId: ChatId): {
  message: string,
  props: MessageProps<ReplyMarkupType[T]>,
  isFirstStep: boolean,
  isLastStep: boolean,
  content: ContentNode<FlatContent>
} {
  const user = store.getUser(chatId);

  const options: StepInformation = {
    currentStep: user.getCurrentStep(),
    maxSteps: user.getAmountOfContent()
  };

  const content = user.getCurrentContent();
  const props = getMessageProps(replyMarkupType, options);

  return {
    message: formatMessage(content, {...options, parseMode: props.parse_mode}),
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
  (type === "inline" && currentStep !== 0)
    ? controls.push(keyboardControls.PREV)
    : controls.push(keyboardControls.HUB);

  // Last button: `Next step`, if there is a next step, overwise - `Back to hub`
  if(currentStep !== (maxSteps - 1)) {
    controls.push(keyboardControls.NEXT);
  } else if(type === "inline" && !controls.includes(keyboardControls.HUB)) {
    controls.push(keyboardControls.HUB);
  }

  return createReplyMarkup(type, controls, {columns: 3});
}
