import { INTERNAL_SERVER_ERROR_MESSAGE } from "@/_graphql/internal/constants";
import { Article } from "@/entity/articles";
import { GraphQLError } from "graphql";
import { getArticlesRepo, getTabsRepo } from "../../internal/utils";

export const findArticleByTabValue = async ({tabValue}: {tabValue: string}): Promise<Article> => {
  try {
    const tab = await getTabsRepo().findOneBy({label: tabValue});

    if(!tab) {
      throw new GraphQLError("Статья с таким названием не найдена!");
    }

    const article = await getArticlesRepo().findOneBy({tabId: tab.id});

    if(!article) {
      throw new GraphQLError("Статья с таким названием не найдена!");
    }

    return article;
  } catch (error) {
    throw new GraphQLError(INTERNAL_SERVER_ERROR_MESSAGE);
  }
};
