import { createData, deleteData, getData, IResponse, TabNode, updateData } from "common/src";
import { SearchOptions } from "common/src/api/types";
import { useAuth } from "../../hooks/useAuth";
import { ServerResponse } from "../articles";

export const getAllTabs = async (where?: Partial<TabNode>): Promise<IResponse<TabNode[]>> => {
  return (await getData("tabs", {
    select: ["id", "label", "type"],
    where,
    orderBy: "id.desc"
  })) as IResponse<TabNode[]> || [];
};

export const getOneTab = async (search: Partial<SearchOptions<TabNode>>): Promise<IResponse<TabNode>> => {
  try {
    const response = await getData("tabs", {...search}) as IResponse<TabNode[]>;

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

export const createTab = async (tabData: Omit<TabNode, "id" | "value">): Promise<ServerResponse> => {
  const {getUserToken} = useAuth();

  try {
    const response = await createData("tabs", {...tabData, token: getUserToken()});

    return {
      ok: response.ok,
      message: response.message
    };
  } catch (e: any) {
    return {
      ok: false,
      message: e.response.data.message
    };
  }
};

export const updateTab = async (updatedData: TabNode): Promise<ServerResponse> => {
  const {getUserToken} = useAuth();

  try {
    const response = await updateData("tabs", {...updatedData, token: getUserToken()});

    if(response) {
      return {
        ok: response,
        message: "Вкладка успешно обновлена!"
      };
    }

    return {
      ok: response,
      message: "Не удалось обновить вкладку!"
    };
  } catch (e: any) {
    return {
      ok: false,
      message: e.response.data.message
    };
  }
};

export const deleteTab = async (id: string | number): Promise<boolean> => {
  const response = await deleteData("tabs", id);
  return response.status === 200;
};
