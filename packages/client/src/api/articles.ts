import { ContentNode, deleteData, getData, IResponse } from "../../../common/src";
import { SearchOptions } from "../../../common/src/api/types";

export const getAllArticles = async (): Promise<IResponse<ContentNode[]>> => {
  return (await getData("articles", {
    select: ["id", "tabId", "label", "type", "picture", "links"]
  })) || [];
}

export const getOneArticle = async (search: Partial<SearchOptions>): Promise<IResponse<ContentNode> | null> => {
  const response = await getData("articles", {...search});

  const data = (response.data && Array.isArray(response.data))
    ? response.data[0]
    : response.data

  return {
    ...response,
    data
  }
}

export const deleteArticle = async (id: string | number): Promise<boolean> => {
  const response = await deleteData("articles", id);
  return response.status === 200;
}
