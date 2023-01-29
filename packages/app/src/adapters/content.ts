import { ContentNode } from "@/types/content";

export const computeArticleData = <T extends ContentNode>(node: T): T[] => {
  if(node._type !== "article" || typeof node.content !== "string") {
    throw new Error("The given node is not of article type!");
  }

  const articleContent = node.content.split("---");
  return Array.from({length: articleContent.length}, (_, index): T => ({...node, content: articleContent[index]}));
};
