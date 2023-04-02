import { IResponse, ServerQuery, TabNode } from "common/src";
import { SearchOptions } from "common/src/api/types";
import { useAuth } from "../../hooks/useAuth";

export const getAllTabs = async (options?: SearchOptions<TabNode>): Promise<IResponse<TabNode[]>> => {
  return await ServerQuery.getInstance().getAll("tabs", {
    ...options,
    orderBy: options?.orderBy || "id.desc"
  });
};

export const getOneTab = async (options?: SearchOptions<TabNode>): Promise<IResponse<TabNode>> => {
  return await ServerQuery.getInstance().getOne<TabNode>("tabs", {
    ...options,
    orderBy: options?.orderBy || "id.desc"
  });
};

export const createTab = async (tabData: Omit<TabNode, "id" | "value">): Promise<IResponse> => {
  const {getUserToken} = useAuth();
  const response = await ServerQuery.getInstance().insert("tabs", {...tabData, token: getUserToken()});

  return {
    ...response,
    message: response.message || "Вкладка успешно создана!"
  };
};

export const updateTab = async (updatedData: TabNode): Promise<IResponse> => {
  const {getUserToken} = useAuth();
  const response = await ServerQuery.getInstance().update("tabs", {...updatedData, token: getUserToken()});

  return {
    ...response,
    message: response.message || "Вкладка успешно обновлена!"
  };
};

export const reorderArticles = async (tabId: number, articlesOrder: number[]): Promise<IResponse> => {
  const {getUserToken} = useAuth();
  const response = await ServerQuery.getInstance().update("articles/reorder", {tabId, articlesOrder, token: getUserToken()});

  return {
    ...response,
    message: response.ok ? "Данные успешно обновлены!" : "Ошибка при обновлении данных!"
  };
};

export const deleteTab = async (id: number | string): Promise<IResponse> => {
  const {getUserToken} = useAuth();
  const response = await ServerQuery.getInstance().delete("tabs", {id, token: getUserToken()});

  return {
    ...response,
    message: response.message || "Вкладка успешно удалена!"
  };
};
