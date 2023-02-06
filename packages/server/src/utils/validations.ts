import { Article } from "@/entity/articles";

export const isValidTabBody = <T extends {type: string, label: string}>(body: T): boolean => {
  return (!body.label || !body.type || (body.type !== "location" && body.type !== "article")) === false;
};

export const isValidArticleBody = <T extends Partial<Article>>(body: T): boolean => {
  const {tabValue, label, content, type, picture, links} = body;

  return (!tabValue || !label || !content || !type || !picture || (Boolean(links) && !Array.isArray(links))) === false;
};

export const isValidId = (id: unknown): id is number => {
  return (!id && isNaN(Number(id))) === false;
};

export const hasNonEmpty = (...args: unknown[]): boolean => {
  for(const value in args) {
    if(value) {
      return true;
    }
  }

  return false;
};
