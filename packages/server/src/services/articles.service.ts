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
  const {select, tabValue, orderBy, ...query} = req.query;

  const selectList = getValidSelectArray(select, new Article());
  const order = useOrderBy(orderBy, new Article());

  if(orderBy && !order) {
    return res.json(createResponse({
      status: 400,
      ok: false,
      message: "Неверный запрос!"
    }));
  }

  if(tabValue) {
    const tabWithValue = await DBSource.getRepository(Tab).findOneBy({value: String(tabValue)});

    if(!tabWithValue) {
      return res.status(404).json(createResponse({
        status: 404,
        ok: false,
        message: "Статьи не найдены!"
      }));
    }

    query.tabId = String(tabWithValue.id);
  }

  const articles = await DBSource.getRepository(Article).find({
    select: selectList,
    where: query,
    order: order ?? {}
  });

  if(articles.length === 0) {
    return res.status(404).json(createResponse({
      status: 404,
      ok: false,
      message: "Статьи не найдены!"
    }));
  }

  return res.status(200).json(createResponse({
    status: 200,
    ok: true,
    data: articles
  }));
};

export const insertArticle: Handler = async (req, res) => {
  const body = req.body;

  if(!isValidArticleBody(body)) {
    return res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Неверный запрос!"
    }));
  }

  const {tabId, label, content, type, picture, links} = body;
  const articleValue = serializeLabel(label);

  const existingTab = await DBSource.getRepository(Tab).countBy({id: tabId});

  if(existingTab === 0) {
    return res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Вкладка с такими данными не найдена!"
    }));
  }

  const existingArticle = await DBSource.getRepository(Article).findOneBy({label});

  if(existingArticle && existingArticle.content === content) {
    return res.status(409).json(createResponse({
      status: 409,
      ok: false,
      message: "Статья с таким названием уже существует!"
    }));
  }

  if(links && Array.isArray(links)) {
    for(const link of links) {
      if(!isValidURL(link)) {
        res.status(400).json(createResponse({
          status: 400,
          ok: false,
          message: "Невалидные ссылки!"
        }));

        return;
      }
    }
  }

  if(!isValidURL(picture)) {
    return res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Ссылка на фотографию некорректна!"
    }));
  }

  const article = new Article();
  article.tabId = Number(tabId);
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

  return res.status(201).json(createResponse({
    status: 201,
    ok: true
  }));
};

export const updateArticle: Handler = async (req, res) => {
  const body = req.body;

  const {id, tabId, label, content, type, picture, links} = body;

  if(!isValidId(id)) {
    return res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Неверный ID!"
    }));
  }

  if(!hasNonEmpty(tabId, label, content, type, picture, links) || (links && !Array.isArray(links))) {
    return res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Неверные данные!"
    }));
  }

  const articleRepo = DBSource.getRepository(Article);

  const foundArticle = await articleRepo.findOneBy({
    id: Number(id)
  });

  if(!foundArticle) {
    return res.status(404).json(createResponse({
      status: 404,
      ok: false,
      message: "Статьи не найдены!"
    }));
  }

  const articleValue = (label)
    ? serializeLabel(label)
    : null;

  tabId && (foundArticle.tabId = Number(tabId));
  label && (foundArticle.label = label);
  content && (foundArticle.content = content);
  articleValue && (foundArticle.value = articleValue);
  type && (foundArticle.type = type);
  picture && (foundArticle.picture = picture);
  links && (foundArticle.links = links);

  articleRepo.save(foundArticle);

  return res.json(createResponse({
    status: 200,
    ok: true
  }));
};

export const deleteArticle: Handler = async (req, res) => {
  const {id: bodyId} = req.body;
  const {id: queryId} = req.query;

  if(!isValidId(bodyId) && !isValidId(queryId)) {
    return res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Запрос не содержит ID статьи!"
    }));
  }

  const id = Number(bodyId ?? queryId);

  const articleRepo = DBSource.getRepository(Article);
  const foundArticle = await articleRepo.findOneBy({id});

  if(!foundArticle) {
    return res.status(404).json(createResponse({
      status: 404,
      ok: false,
      message: "Статьи не найдены!"
    }));
  }

  await articleRepo.delete(foundArticle);

  return res.json(createResponse({
    status: 200,
    ok: true
  }));
};
