import { EXTRA_LINKS } from "@/constants/messages";
import { MessageBuilder } from "@/services/messageBuilder";
import { StepInformation, UserDataContent } from "@/types/user";

/**
 * Represents user data steps like `1/5`, where `1` is the current step, `5` is the last possible step.
 * The steps are counted from `1` unlike actual steps in the given type.
 */
export const formatCountLabel = (currentStep: number, maxSteps: number): string => {
  return `${currentStep + 1}/${maxSteps}`;
};

/**
 * Takes content node and returns string with well-formatted message to be sent to the user.
 * The message will contain bold title, main content info, and extra links part, if links are provided.
 */
export const formatMessage = (content: UserDataContent, options: StepInformation): string => {
  const messageBuilder = new MessageBuilder();

  messageBuilder
    .append(content.label, "*")
    .appendEmptyLine()
    .appendLine(content.content[options.currentStep]);

  if(shouldAddLinks(content, options)) {
    messageBuilder
      .appendEmptyLine()
      .appendLine(EXTRA_LINKS)
      .append(" ")
      .append(content.links.join(", "));
  }

  return messageBuilder
    .appendEmptyLine()
    .appendLine(formatCountLabel(options.currentStep, options.maxSteps), "*")
    .message;
};

const shouldAddLinks = (content: UserDataContent, options: StepInformation): content is UserDataContent & {links: string[]} & boolean => {
  return (content.links && content.links.length !== 0 && (options.currentStep === options.maxSteps - 1)) ?? false;
};
