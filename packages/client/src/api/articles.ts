import { ContentNode, getData } from "@/common/";

export const getArticles = async (): Promise<ContentNode[]> => {
  return (await getData("articles")).content ?? [];
}
