import { ContentNode } from "@/common";
import { getArticleType } from "@/components/content";
import { Pagination, Separation } from "@/components/control-flow";
import { IControlFlow } from "@/components/control-flow/types";

export const getChatControlFlow = (data: ContentNode[]): IControlFlow => {
  const type = getArticleType(data);

  if(type === "invalid") {
    throw new Error("Given content is of different article type!");
  }

  const controlFlow = (type === "article")
    ? new Pagination()
    : new Separation();

  return controlFlow;
};
