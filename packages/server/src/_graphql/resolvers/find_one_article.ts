import { Article } from "@/entity/articles";
import { GraphQLError } from "graphql";
import { computeResponseError } from "../internal/compute_response_error";
import { getArticlesRepo } from "../internal/utils";

export const findOneArticle = async ({id}: {id: number}): Promise<Article> => {
  try {
    const article = await getArticlesRepo().findOneBy({id});

    if(!article) {
      throw new GraphQLError("Статья не найдена!");
    }

    return article;
  } catch(error) {
    throw computeResponseError(error);
  }
};
