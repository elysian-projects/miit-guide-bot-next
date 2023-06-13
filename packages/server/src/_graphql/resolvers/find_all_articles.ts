import { SearchOptions } from "@/../../common/dist/api/types";
import { Article } from "@/entity/articles";
import { ApiResponse } from "@/types/api";
import { getPaginationProps } from "@/utils/pagination";
import { FindOptionsWhere } from "typeorm";
import { computeResponseError } from "../internal/compute_response_error";
import { getArticlesRepo } from "../internal/utils";

export const findAllArticles = async ({where, order, page, take}: SearchOptions<Article>): Promise<ApiResponse<Article>> => {
  const articlesRepo = getArticlesRepo();
  const paginationProps = getPaginationProps(page, take);

  try {
    const articles = await articlesRepo.find({
      order: {[order?.prop as keyof Article]: order?.order},
      where: where as FindOptionsWhere<Article>,
      ...paginationProps
    });

    if(articles.length === 0) {
      throw new Error("Статьи не найдены!");
    }

    const articlesCount = await articlesRepo.count();

    return {
      data: articles,
      pagination: {
        pages: Math.ceil(articlesCount / paginationProps.take),
        itemsPerPage: paginationProps.take
      }
    };
  } catch(error) {
    throw computeResponseError(error);
  }
};
