import { SearchOptions } from "@/../../common/dist/api/types";
import { INTERNAL_SERVER_ERROR_MESSAGE } from "@/_graphql/internal/constants";
import { Article } from "@/entity/articles";
import { ApiResponse } from "@/types/api";
import { getPaginationProps } from "@/utils/pagination";
import { GraphQLError } from "graphql";
import { FindOptionsWhere } from "typeorm";
import { getArticlesRepo } from "../../internal/utils";

export const findAllArticles = async ({order, page, take, where}: SearchOptions<Article>): Promise<ApiResponse> => {
  const articlesRepo = getArticlesRepo();
  const paginationProps = getPaginationProps(page, take);

  const query = {...(where)} as FindOptionsWhere<Article>;

  try {
    const articles = await articlesRepo.find({
      order: {[order?.prop as keyof Article]: order?.order},
      where: query,
      ...paginationProps
    });

    const articlesCount = await articlesRepo.count();

    return {
      data: articles,
      pagination: {
        pages: Math.ceil(articlesCount / paginationProps.take),
        itemsPerPage: paginationProps.take
      }
    };
  } catch(error) {
    throw new GraphQLError(INTERNAL_SERVER_ERROR_MESSAGE);
  }
};
