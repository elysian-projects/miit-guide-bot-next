import { DBSource } from "@/database/data-source";
import { Article } from "@/entity/articles";
import { createResponse } from "@/utils/response";
import { serializeTabLabel as serializeLabel } from "@/utils/serializer";
import { hasNonEmpty, isValidArticleBody, isValidId } from "@/utils/validations";
import { Handler } from "express";
import { FindOptionsWhere } from "typeorm";

export const getArticles: Handler = async (req, res) => {
  const {id, tabId, label, value, type} = req.query;

  const conditions: FindOptionsWhere<Article> = {};

  isValidId(id) && (conditions.id = Number(id));
  isValidId(tabId) && (conditions.tabId = Number(tabId));
  label && (conditions.label = String(label));
  value && (conditions.value = String(value));
  type && (conditions.type = String(type));

  const articles = await DBSource.getRepository(Article).find({
    where: conditions,

    // TODO: add orderBy query prop
    order: {
      id: "DESC"
    }
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

// TODO: add picture, links and `tabId` existence validation
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

  const {tabId, label, content, type, picture, links} = body;
  const articleValue = serializeLabel(label);

  const existingArticle = await DBSource.getRepository(Article).countBy({label});

  if(existingArticle !== 0) {
    res.status(409).json(createResponse({
      status: 409,
      ok: false,
      message: "An article with given name already exists!"
    }));

    return;
  }

  const article = new Article();
  article.tabId = Number(tabId);
  article.label = String(label);
  article.value = articleValue;
  article.content = String(content);
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

  const {id, tabId, label, content, type, picture, links} = body;

  if(!isValidId(id)) {
    res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Invalid id!"
    }));

    return;
  }

  if(!hasNonEmpty(tabId, label, content, type, picture, links) || (links && !Array.isArray(links))) {
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

  isValidId(tabId) && (foundArticle.tabId = tabId);
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
