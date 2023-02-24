import { FlatContent, RichContent } from "../types";

export const flattenContent = (content: RichContent | FlatContent | undefined): FlatContent => {
  if(!content) {
    return "";
  }

  if(typeof content !== "object" && Array.isArray(content)) {
    return content.join(" ");
  }

  return String(content);
};

export const shrinkValueLength = (value: string, maxChars = 20): string => {
  if(value.length <= maxChars) {
    return value;
  }

  return value.substring(0, maxChars);
};
