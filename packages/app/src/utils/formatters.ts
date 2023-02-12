import { ContentNode, FlatContent } from "@/common";
import { EXTRA_LINKS } from "@/constants/messages";
import { StepInformation } from "@/types/user";
import { MessageBuilder, TextDecorator } from "@/utils/messageBuilder";
import { ParseMode } from "grammy/out/types.node";

/**
 * Takes content node and returns string with well-formatted message to be sent to the user.
 * The message will contain bold title, main content info, and extra links part, if links are provided.
 */
export const formatMessage = (content: ContentNode<FlatContent>, options: StepInformation & {parseMode: ParseMode}): string => {
  const messageBuilder = new MessageBuilder();

  messageBuilder
    .append(TextDecorator.getBoldText(content.label, options.parseMode))
    .appendEmptyLine()
    .appendLine(content.content);

  if(shouldAddLinks(content, options)) {
    messageBuilder
      .appendEmptyLine()
      .appendLine(EXTRA_LINKS)
      .append(" ")
      .append(content.links.join(", "));
  }

  return messageBuilder
    .appendEmptyLine()
    .appendLine(TextDecorator.getBoldText(formatCountLabel(options.currentStep, options.maxSteps), options.parseMode))
    .message;
};

/**
 * Represents user data steps like `1/5`, where `1` is the current step, `5` is the last possible step.
 * The steps are counted from `1` unlike actual steps in the given type.
 */
const formatCountLabel = (currentStep: number, maxSteps: number): string => {
  return `${currentStep + 1}/${maxSteps}`;
};

const shouldAddLinks = (content: ContentNode<FlatContent>, options: StepInformation): content is ContentNode<FlatContent> & {links: string[]} & boolean => {
  return (content.links && content.links.length !== 0 && options.isLastArticleNode) ?? false;
};
