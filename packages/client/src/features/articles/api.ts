import { ContentNode, FlatContent, flattenAllContent, IResponse, ServerQuery } from "common/src";
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
};

export const deleteArticle = async (id: number | string): Promise<IResponse> => {
  const {getUserToken} = useAuth();
  return await new ServerQuery().delete("articles", {id, token: getUserToken()});
};
