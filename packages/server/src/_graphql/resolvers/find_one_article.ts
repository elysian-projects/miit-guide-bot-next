import { INTERNAL_SERVER_ERROR_MESSAGE } from "@/_graphql/internal/constants";
import { Article } from "@/entity/articles";
import { GraphQLError } from "graphql";
import { getArticlesRepo } from "../internal/utils";

export const findOneArticle = async ({id}: {id: number}): Promise<Article> => {
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
    console.log(error);

    if(error instanceof GraphQLError) {
      throw error;
    }

    throw new GraphQLError(INTERNAL_SERVER_ERROR_MESSAGE);
  }
};
