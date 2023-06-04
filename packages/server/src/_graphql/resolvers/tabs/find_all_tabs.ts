import { SearchOptions } from "@/../../common/dist/api/types";
import { getTabsRepo } from "@/_graphql/internal/utils";
import { Tab } from "@/entity/tabs";
import { ApiResponse } from "@/types/api";
import { getPaginationProps } from "@/utils/pagination";
import { FindOptionsWhere } from "typeorm";

export const findAllTabs = async ({order, page, take, where}: SearchOptions<Tab>): Promise<ApiResponse<Tab>> => {
  const tabsRepo = getTabsRepo();
  const paginationProps = getPaginationProps(page, take);

  const query = {...(where)} as FindOptionsWhere<Tab>;

  const tabs = await tabsRepo.find({
    order: {[order?.prop as keyof Tab]: order?.order},
    where: query,
    ...paginationProps
  });

  const articlesCount = await tabsRepo.count();

  return {
    data: tabs,
    pagination: {
      pages: Math.ceil(articlesCount / paginationProps.take),
      itemsPerPage: paginationProps.take
    }
  };
};
