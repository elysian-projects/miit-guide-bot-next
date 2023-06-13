import { SearchOptions } from "@/../../common/dist/api/types";
import { getTabsRepo } from "@/_graphql/internal/utils";
import { Tab } from "@/entity/tabs";
import { ApiResponse } from "@/types/api";
import { getPaginationProps } from "@/utils/pagination";
import { FindOptionsWhere } from "typeorm";
import { computeResponseError } from "../internal/compute_response_error";

export const findAllTabs = async ({order, page, take, where}: SearchOptions<Tab>): Promise<ApiResponse<Tab>> => {
  const tabsRepo = getTabsRepo();
  const paginationProps = getPaginationProps(page, take);

  try {
    const tabs = await tabsRepo.find({
      order: {[order?.prop as keyof Tab]: order?.order},
      where: where as FindOptionsWhere<Tab>,
      ...paginationProps
    });

    if(tabs.length === 0) {
      throw new Error("Вкладки не найдены!");
    }

    const articlesCount = await tabsRepo.count();

    return {
      data: tabs,
      pagination: {
        pages: Math.ceil(articlesCount / paginationProps.take),
        itemsPerPage: paginationProps.take
      }
    };
  } catch(error) {
    throw computeResponseError(error);
  }
};
