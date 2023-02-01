import { EXTRA_LINKS } from "@/chat/constants";
import { ContentNode, WithLinks } from "@/types/content";

// TODO: create message builder service

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
export const formatMessage = (content: ContentNode & Partial<WithLinks>, options: {currentStep: number, maxSteps: number}): string => {
  let message = `
*${content.label}*

${content.content[options.currentStep]}`;

  if(content.links && (options.currentStep === options.maxSteps - 1)) {
    message += `\n\n${EXTRA_LINKS} ${content.links.join(", ")}`;
  }

  message += `\n\n*(${formatCountLabel(options.currentStep, options.maxSteps)})*`;

  return message;
};
