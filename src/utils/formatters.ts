import { EXTRA_LINKS } from "@/constants/replies";
import { Content } from "@/types/content";
import { UserData } from "@/types/user";

/**
 * Represents user data steps like `1/5`, where `1` is the current step, `5` is the last possible step.
 * The steps are counted from `1` unlike actual steps in the given type.
 */
export const formatCountLabel = (userData: UserData): string => {
  const currentStep = userData.step + 1;
  const maxSteps = userData.content.length;

  return `${currentStep}/${maxSteps}`;
};

/**
 * Takes content node and returns string with well-formatted message to be sent to the user.
 * The message will contain bold title, main content info, and extra links part, if links are provided.
 */
export const formatMessage = (content: Content): string => {
  let message = `
*${content.title}*

${content.information}
  `;

  if(content.links) {
    message += `\n${EXTRA_LINKS} ${content.links.join(", ")}`;
  }

  return message;
};
