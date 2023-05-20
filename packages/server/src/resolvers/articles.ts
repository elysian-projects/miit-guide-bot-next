import { SearchOptions } from "@/../../common/dist/api/types";
import { DBSource } from "@/database/data-source";
import { Article } from "@/entity/articles";
import { Tab } from "@/entity/tabs";
import { getPaginationProps } from "@/utils/pagination";
import { GraphQLError } from "graphql";
import { FindOptionsWhere, Repository } from "typeorm";

type Response = {
  data: Article | Article[],
  pagination: {
    pages: number,
    itemsPerPage: number
  }
}

export const getAllArticles = async ({order, page, take, where, tabValue}: SearchOptions<Article> & {tabValue?: string}): Promise<Response> => {
  const articlesRepo = getArticlesRepo();
  const paginationProps = getPaginationProps(page, take);

  const query = {...(where)} as FindOptionsWhere<Article>;

  try {
    if(tabValue) {
      const tab = await getTabsRepo().findOneBy({label: tabValue});

      if(!tab) {
        throw new GraphQLError("Статья с таким названием не найдена!");
      }

      query.tabId = tab.id;
    }

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
    throw new GraphQLError("Внутренняя ошибка сервера!");
  }
};

export const getOneArticle = async ({id}: {id?: number}): Promise<Article> => {
  const articlesRepo = getArticlesRepo();

  if(!id) {
    throw new GraphQLError("Входные данные невалидны: нужно предоставить `id` статьи!");
  }

  try {
    const response = await articlesRepo.findOneBy({id});

    if(!response) {
      throw new GraphQLError("Статья не найдена!");
    }

    return response;
  } catch(error) {
    if(error instanceof GraphQLError) {
      throw error;
    }

    throw new GraphQLError("Внутренняя ошибка сервера!");
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteArticle = (_id: number) => {
  // TODO: implement
};

const getArticlesRepo = (): Repository<Article> => {
  return DBSource.getRepository(Article);
};

const getTabsRepo = (): Repository<Tab> => {
  return DBSource.getRepository(Tab);
};
