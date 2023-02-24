import { ContentNode, deleteData, FlatContent, getData, IResponse, updateData } from "common/src";
import { SearchOptions } from "common/src/api/types";

export const getAllArticles = async (where?: Partial<ContentNode>): Promise<IResponse<ContentNode[]>> => {
  return (await getData("articles", {
    select: ["id", "tabId", "label", "type", "picture", "links"],
    where
  })) as IResponse<ContentNode[]> || [];
};

export const getOneArticle = async (search: Partial<SearchOptions<ContentNode>>): Promise<IResponse<ContentNode<FlatContent>>> => {
  const response = await getData("articles", {...search}) as IResponse<ContentNode<FlatContent>[]>;

  const data = (response.data && Array.isArray(response.data))
    ? response.data[0]
    : response.data;

  return {
    ...response,
    data
  };
};

export const updateArticle = async (updatedData: ContentNode<FlatContent>): Promise<{ok: boolean, message: string}> => {
  const response = await updateData("articles", updatedData);

  if(response) {
    return {
      ok: response,
      message: "Статья успешно обновлена!"
    };
  }

  return {
    ok: response,
    message: "Не удалось обновить статью!"
  };
};

export const deleteArticle = async (id: number | string): Promise<boolean> => {
  const response = await deleteData("articles", id);
  return response.status === 200;
};
