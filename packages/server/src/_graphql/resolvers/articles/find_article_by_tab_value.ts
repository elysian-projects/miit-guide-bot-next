import { computeResponseError } from "@/_graphql/internal/compute_response_error";
import { Article } from "@/entity/articles";
import { getArticlesRepo, getTabsRepo } from "../../internal/utils";

export const findArticlesByTabValue = async ({tabValue}: {tabValue: string}): Promise<Article[]> => {
  try {
    const tab = await getTabsRepo().findOneBy({label: tabValue});

    if(!tab) {
      throw new Error("Вкладка с таким названием не найдена!");
    }

    const article = await getArticlesRepo().find({
      where: {tabId: tab.id},

      // This resolver is very specific and only exists for the bot application so there's
      // no need to make any complicated logic on ordering since it won't ever change
      order: {order: "ASC"}
    });

    if(!article) {
      throw new Error("В этой вкладке нет статей!");
    }

    return article;
  } catch(error) {
    throw computeResponseError(error);
  }
};
