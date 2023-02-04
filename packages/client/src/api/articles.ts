import { getData } from "@/common";
import { ContentNode } from "@/common/types";

export const getArticles = async (): Promise<ContentNode[]> => {
  return (await getData("articles")).content ?? [];
}
