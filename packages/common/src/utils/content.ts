import { ContentNode, FlatContent, RichContent } from "../types";

export const flattenAllContent = (nodes: ContentNode<RichContent> | ContentNode<RichContent>[]): ContentNode<FlatContent>[] => {
  const content = Array.isArray(nodes)
    ? nodes
    : [nodes];

  return content.map(contentNode => ({...contentNode, content: flattenContent(contentNode.content)}));
};

export const flattenContent = (content: RichContent | FlatContent | undefined): FlatContent => {
  if(!content) {
    return "";
  }

  if(Array.isArray(content)) {
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
