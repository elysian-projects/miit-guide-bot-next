import { ContentNode, getData } from "../../../common/src";

export const getArticles = async (): Promise<ContentNode[]> => {
  return (await getData("articles")).content ?? [];
}
