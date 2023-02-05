import { ContentNode, deleteData, getData } from "../../../common/src";
import { SearchOptions } from "../../../common/src/api/types";

export const getAllArticles = async (): Promise<ContentNode[]> => {
  return (await getData("articles", {
    select: ["id", "tabValue", "label", "type", "picture", "links"]
  })).content ?? [];
}

export const getOneArticle = async (search: Partial<SearchOptions>): Promise<ContentNode | null> => {
  const data = await getData("articles", {...search});
  return data.content ? data.content[0] : null
}

export const deleteArticle = async (id: string | number): Promise<boolean> => {
  const response = await deleteData("articles", id);
  return response.status === 200;
}
