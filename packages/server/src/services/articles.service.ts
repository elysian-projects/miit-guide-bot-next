import { DBSource } from "@/database/data-source";
import { Article } from "@/entity/articles";
import { Tab } from "@/entity/tabs";
import { normalizeContent } from "@/utils/formatters";
import { useOrderBy } from "@/utils/orderBy";
import { getPaginationProps } from "@/utils/pagination";
import { createResponse } from "@/utils/response";
import { getValidSelectArray } from "@/utils/selectValidation";
import { serializeTabLabel as serializeLabel } from "@/utils/serializer";
import { hasNonEmpty, isValidArticleBody, isValidId } from "@/utils/validations";
import { isValidURL } from "common/dist";
import { Handler } from "express";

// sorting: ?orderBy=id.asc
// selecting: ?select[]=id&select[]=label
export const getArticles: Handler = async (req, res) => {
  const {select, tabValue, orderBy, page, take, ...query} = req.query;

  const paginationProps = getPaginationProps(page, take);
  const selectList = getValidSelectArray(select, new Article());
  const order = useOrderBy(orderBy, new Article());

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

  try {
    const articlesRepo = DBSource.getRepository(Article);

    const articles = await articlesRepo.find({
      select: selectList,
      where: query,
      order: order ?? {},
      ...paginationProps
    });

    if(articles.length === 0) {
      return res.status(404).json(createResponse({
        status: 404,
        ok: false,
        message: "Статьи не найдены!"
      }));
    }

    const response = createResponse({
      status: 200,
      ok: true,
      data: articles
    });

    // if(paginationProps.skip && paginationProps.take) {
      // const articlesCount = await articlesRepo.count();

      // response.pages = Math.ceil(articlesCount / paginationProps.take);
      // response.itemsPerPage = paginationProps.take;
    // }

    return res.status(200).json(response);
  } catch(error) {
    return res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Невалидный запрос!"
    }));
  }
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

  const {tabId, label, content, picture, links} = body;
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

  if(existingArticle && existingArticle.label === label) {
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
  article.content = normalizeContent(content);
  article.addedOn = new Date();
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

  const {id, tabId, label, content, picture, links} = body;

  if(!isValidId(id)) {
    return res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Неверный ID!"
    }));
  }

  if(!hasNonEmpty(tabId, label, content, picture, links) || (links && !Array.isArray(links))) {
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
  content && (foundArticle.content = normalizeContent(content));
  articleValue && (foundArticle.value = articleValue);
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
  const tabRepo = DBSource.getRepository(Tab);

  const foundArticle = await articleRepo.findOneBy({id});

  if(!foundArticle) {
    return res.status(404).json(createResponse({
      status: 404,
      ok: false,
      message: "Статьи не найдены!"
    }));
  }

  // If the last article inside the tab gets deleted the tab will also be deleted
  const amountOfArticlesOnTheSameTab = await articleRepo.countBy({tabId: foundArticle.tabId});

  if(amountOfArticlesOnTheSameTab === 1) {
    await tabRepo.delete({id: foundArticle.tabId});
  }

  await articleRepo.delete({id: foundArticle.id});

  return res.json(createResponse({
    status: 200,
    ok: true
  }));
};
