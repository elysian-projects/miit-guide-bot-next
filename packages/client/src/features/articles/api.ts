import { ContentNode, deleteData, FlatContent, flattenAllContent, IResponse, ServerQuery } from "common/src";
import { SearchOptions } from "common/src/api/types";
import { useAuth } from "../../hooks/useAuth";

export const getAllArticles = async (options?: SearchOptions<ContentNode>): Promise<IResponse<ContentNode<FlatContent>[]>> => {
  const response = await new ServerQuery().getAll("articles", {
    ...options,
    orderBy: options?.orderBy || "id.asc"
  });

  return {
    ...response,
    data: flattenAllContent(response.data || [])
  };
};

export const getOneArticle = async (options: SearchOptions<ContentNode>): Promise<IResponse<ContentNode<FlatContent>>> => {
  const response = await new ServerQuery().getOne<ContentNode>("articles", {
    ...options,
    orderBy: options?.orderBy || "id.asc"
  });

  return {
    ...response,
    data: flattenAllContent(response.data || [])[0] || {}
  };
};

export const createArticle = async (articleData: ContentNode<FlatContent>): Promise<IResponse> => {
  const {getUserToken} = useAuth();
  return await new ServerQuery().insert("articles", {...articleData, token: getUserToken()});
};

export const updateArticle = async (updatedData: ContentNode<FlatContent>): Promise<IResponse> => {
  const {getUserToken} = useAuth();
  return await new ServerQuery().update("articles", {...updatedData, token: getUserToken()});

  // try {
  //   const response = await updateData("articles", {...updatedData, token: getUserToken()});

  //   if(response) {
  //     return {
  //       ok: response,
  //       message: "Статья успешно обновлена!"
  //     };
  //   }

  //   return {
  //     ok: response,
  //     message: "Не удалось обновить статью!"
  //   };
  // } catch (e: any) {
  //   return {
  //     ok: false,
  //     message: e.response.data.message
  //   };
  // }
};

export const deleteArticle = async (id: number | string): Promise<boolean> => {
  const {getUserToken} = useAuth();

  try {
    const response = await deleteData("articles", id, {token: getUserToken()});
    return response.status === 200;
  } catch(error) {
    return false;
  }
};
