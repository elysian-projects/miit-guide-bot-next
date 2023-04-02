import { ContentNode, FlatContent, flattenAllContent, IResponse, ServerQuery } from "common/src";
import { SearchOptions } from "common/src/api/types";
import { useAuth } from "../../hooks/useAuth";

export const getAllArticles = async (options?: SearchOptions<ContentNode>): Promise<IResponse<ContentNode<FlatContent>[]>> => {
  const response = await ServerQuery.getInstance().getAll("articles", {
    ...options,
    orderBy: options?.orderBy || "id.desc"
  });

  return {
    ...response,
    data: flattenAllContent(response.data || [])
  };
};

export const getOneArticle = async (options: SearchOptions<ContentNode>): Promise<IResponse<ContentNode<FlatContent>>> => {
  const response = await ServerQuery.getInstance().getOne<ContentNode>("articles", {
    ...options,
    orderBy: options?.orderBy || "id.desc"
  });

  return {
    ...response,
    data: flattenAllContent(response.data || [])[0] || {}
  };
};

export const createArticle = async (articleData: ContentNode<FlatContent>): Promise<IResponse> => {
  const {getUserToken} = useAuth();
  const response = await ServerQuery.getInstance().insert("articles", {...articleData, token: getUserToken()});

  return {
    ...response,
    message: response.message || "Статья успешно создана!"
  };
};

export const updateArticle = async (updatedData: ContentNode<FlatContent>): Promise<IResponse> => {
  const {getUserToken} = useAuth();
  const response = await ServerQuery.getInstance().update("articles", {...updatedData, token: getUserToken()});

  return {
    ...response,
    message: response.message || "Статья успешно обновлена!"
  };
};

export const deleteArticle = async (id: number | string): Promise<IResponse> => {
  const {getUserToken} = useAuth();
  const response = await ServerQuery.getInstance().delete("articles", {id, token: getUserToken()});

  return {
    ...response,
    message: response.message || "Статья успешно удалена!"
  };
};
