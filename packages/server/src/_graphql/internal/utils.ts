import { DBSource } from "@/database/data-source";
import { Article } from "@/entity/articles";
import { Tab } from "@/entity/tabs";
import { Repository } from "typeorm";

export const getArticlesRepo = (): Repository<Article> => {
  return DBSource.getRepository(Article);
};

export const getTabsRepo = (): Repository<Tab> => {
  return DBSource.getRepository(Tab);
};
