import { ContentNode, deleteData, FlatContent, getData, IResponse, updateData } from "common/src";
import { SearchOptions } from "common/src/api/types";
import { useAuth } from "../../hooks/useAuth";

export const getAllArticles = async (where?: Partial<ContentNode>): Promise<IResponse<ContentNode[]>> => {
  return (await getData("articles", {
    select: ["id", "tabId", "label", "type", "picture", "links"],
    where,
    orderBy: "id.asc"
  })) as IResponse<ContentNode[]> || [];
};

export const getOneArticle = async (search: Partial<SearchOptions<ContentNode>>): Promise<IResponse<ContentNode<FlatContent>>> => {
  try {
    const response = await getData("articles", {...search}) as IResponse<ContentNode<FlatContent>[]>;

    const data = (response.data && Array.isArray(response.data))
      ? response.data[0]
      : response.data;

    return {
      ...response,
      data
    };
  } catch (error: any) {
    console.log("Error:", error.response.data.message);

    return {
      status: error.response.data.status,
      message: error.response.data.message,
      ok: false,
    };
  }
};

export const updateArticle = async (updatedData: ContentNode<FlatContent>): Promise<{ok: boolean, message: string}> => {
  const {getUserToken} = useAuth();

  try {
    const response = await updateData("articles", {...updatedData, token: getUserToken()});

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
  } catch (e: any) {
    return {
      ok: false,
      message: e.response.data.message
    };
  }

};

export const deleteArticle = async (id: number | string): Promise<boolean> => {
  const response = await deleteData("articles", id);
  return response.status === 200;
};
