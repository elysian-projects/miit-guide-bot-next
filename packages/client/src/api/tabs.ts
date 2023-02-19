import { deleteData, getData, IResponse, TabNode } from "common/src";
import { SearchOptions } from "common/src/api/types";

export const getAllTabs = async (where?: Partial<TabNode>): Promise<IResponse<TabNode[]>> => {
  return (await getData("tabs", {
    select: ["id", "label", "type"],
    where
  })) || [];
}

export const getOneTab = async (search: Partial<SearchOptions<TabNode>>): Promise<IResponse<TabNode> | null> => {
  const response = await getData("tabs", {...search});

  const data = (response.data && Array.isArray(response.data))
    ? response.data[0]
    : response.data

  return {
    ...response,
    data
  }
}

export const deleteTab = async (id: string | number): Promise<boolean> => {
  const response = await deleteData("tabs", id);
  return response.status === 200;
}
