import { Tab } from "@/entity/tabs";
import { computeResponseError } from "../internal/compute_response_error";
import { getTabsRepo } from "../internal/utils";

export const findOneTab = async ({id}: {id: number}): Promise<Tab> => {
  try {
    const tab = await getTabsRepo().findOneBy({id});

    if(!tab) {
      throw new Error("Вкладка не найдена!");
    }

    return tab;
  } catch(error) {
    throw computeResponseError(error);
  }
};
