import { isValidURL } from "@/../../common/src";
import { DBSource } from "@/database/data-source";
import { Article } from "@/entity/articles";
import { Tab } from "@/entity/tabs";
import { normalizeContent } from "@/utils/formatters";
import { useOrderBy } from "@/utils/orderBy";
import { createResponse } from "@/utils/response";
import { getValidSelectArray } from "@/utils/selectValidation";
import { serializeTabLabel as serializeLabel } from "@/utils/serializer";
import { hasNonEmpty, isValidArticleBody, isValidId } from "@/utils/validations";
import { Handler } from "express";

// sorting: ?orderBy=id.asc
// selecting: ?select[]=id&select[]=label
export const getArticles: Handler = async (req, res) => {
  const {select, orderBy, ...query} = req.query;

  const selectList = getValidSelectArray(select, new Article());
  const order = useOrderBy(orderBy, new Article());

  if(orderBy && !order) {
    res.json(createResponse({
      status: 400,
      ok: false,
      message: "Invalid query parameters passed!"
    }));

    return;
  }

  const articles = await DBSource.getRepository(Article).find({
    select: selectList,
    where: query,
    order: order ?? {}
  });

  if(articles.length === 0) {
    res.status(404).json(createResponse({
      status: 404,
      ok: false,
      message: "No articles found"
    }));

    return;
  }

  res.status(200).json(createResponse({
    status: 200,
    ok: true,
    data: articles
  }));
};

export const insertArticle: Handler = async (req, res) => {
  const body = req.body;

  if(!isValidArticleBody(body)) {
    res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Invalid data!"
    }));

    return;
  }

  const {tabValue, label, content, type, picture, links} = body;
  const articleValue = serializeLabel(label);

  const existingTab = await DBSource.getRepository(Tab).countBy({value: tabValue});

  if(existingTab === 0) {
    res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Tab with given value was not found!"
    }));

    return;
  }

  const existingArticle = await DBSource.getRepository(Article).countBy({label});

  if(existingArticle !== 0) {
    res.status(409).json(createResponse({
      status: 409,
      ok: false,
      message: "An article with given name already exists!"
    }));

    return;
  }

  if(links && Array.isArray(links)) {
    for(const link of links) {
      if(!isValidURL(link)) {
        res.status(400).json(createResponse({
          status: 400,
          ok: false,
          message: "Invalid URL links were given!"
        }));

        return;
      }
    }
  }

  if(!isValidURL(picture)) {
    res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Invalid picture link was given!"
    }));

    return;
  }

  const article = new Article();
  article.tabValue = String(tabValue);
  article.label = String(label);
  article.value = articleValue;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  article.content = normalizeContent(content);
  article.type = String(type);
  article.picture = String(picture);

  if(links) {
    article.links = links;
  }

  await DBSource.getRepository(Article).save(article);

  res.status(201).json(createResponse({
    status: 201,
    ok: true
  }));
};

export const updateArticle: Handler = async (req, res) => {
  const body = req.body;

  const {id, tabId: tabValue, label, content, type, picture, links} = body;

  if(!isValidId(id)) {
    res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Invalid id!"
    }));

    return;
  }

  if(!hasNonEmpty(tabValue, label, content, type, picture, links) || (links && !Array.isArray(links))) {
    res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Invalid data!"
    }));

    return;
  }

  const articleRepo = DBSource.getRepository(Article);

  const foundArticle = await articleRepo.findOneBy({
    id: Number(id)
  });

  if(!foundArticle) {
    res.status(404).json(createResponse({
      status: 404,
      ok: false,
      message: "No article found!"
    }));

    return;
  }

  const articleValue = (label)
    ? serializeLabel(label)
    : null;

  tabValue && (foundArticle.tabValue = tabValue);
  label && (foundArticle.label = label);
  content && (foundArticle.content = content);
  articleValue && (foundArticle.value = articleValue);
  type && (foundArticle.type = type);
  picture && (foundArticle.picture = picture);
  links && (foundArticle.links = links);

  articleRepo.save(foundArticle);

  res.json(createResponse({
    status: 200,
    ok: true
  }));
};

export const deleteArticle: Handler = async (req, res) => {
  const {id: bodyId} = req.body;
  const {id: queryId} = req.query;

  if(!isValidId(bodyId) && !isValidId(queryId)) {
    res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Article id was not provided!"
    }));

    return;
  }

  const id = Number(bodyId ?? queryId);

  const articleRepo = DBSource.getRepository(Article);
  const foundArticle = await articleRepo.findOneBy({id});

  if(!foundArticle) {
    res.status(404).json(createResponse({
      status: 404,
      ok: false,
      message: "No article found!"
    }));

    return;
  }

  await articleRepo.delete(foundArticle);

  res.json(createResponse({
    status: 200,
    ok: true
  }));
};
