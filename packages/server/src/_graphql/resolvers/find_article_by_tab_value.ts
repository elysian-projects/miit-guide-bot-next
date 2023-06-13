import { computeResponseError } from "@/_graphql/internal/compute_response_error";
import { Article } from "@/entity/articles";
import { getArticlesRepo, getTabsRepo } from "../internal/utils";

export const findArticlesByTabValue = async ({tabValue}: {tabValue: string}): Promise<Article[]> => {
  try {
    const tab = await getTabsRepo().findOneBy({value: tabValue});

    if(!tab) {
      throw new Error("Вкладка с таким названием не найдена!");
    }

    const articles = await getArticlesRepo().find({
      where: {tabId: tab.id},

      // This resolver is very specific and only exists for the bot application so there's
      // no need to make any complicated logic on ordering since it won't ever change
      order: {order: "ASC"}
    });

    if(articles.length === 0) {
      throw new Error("Эта вкладка пока пуста!");
    }

    return articles;
  } catch(error) {
    throw computeResponseError(error);
  }
};
