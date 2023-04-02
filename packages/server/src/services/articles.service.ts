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

  const articleRepo = DBSource.getRepository(Article);
  const tabRepo = DBSource.getRepository(Tab);

  const existingTab = await tabRepo.countBy({id: tabId});

  if(existingTab === 0) {
    return res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Вкладка с такими данными не найдена!"
    }));
  }

  const existingArticle = await articleRepo.findOneBy({label});

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

  // Calculating order index of the new articles by the number of articles in the tab
  const lastArticleOrder = await articleRepo.countBy({tabId});

  const article = new Article();
  article.tabId = Number(tabId);
  article.label = String(label);
  article.value = articleValue;
  article.content = normalizeContent(content);
  article.order = lastArticleOrder;
  article.addedOn = new Date();
  article.picture = String(picture);

  if(links) {
    article.links = links;
  }

  await articleRepo.save(article);

  return res.status(201).json(createResponse({
    status: 201,
    ok: true
  }));
};

export const updateArticle: Handler = async (req, res) => {
  const body = req.body;

  // Note: this endpoint should not allow to change the order property,
  // since it does not include the control over order indexes uniqueness
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

export const updateOrder: Handler = async (req, res) => {
  const {tabId, articlesOrder}: {tabId?: number, articlesOrder?: number[]} = req.body;

  if(!tabId || !articlesOrder) {
    return res.status(400).json(createResponse({
      ok: false,
      status: 400,
      message: "Data was not provided: to commit a reorder, you must provide a `tabId: number` and `articleOrder: number[]`"
    }));
  }

  const tabRepo = DBSource.getRepository(Tab);
  const articleRepo = DBSource.getRepository(Article);

  const foundTab = await tabRepo.findOneBy({id: tabId});

  if(!foundTab) {
    return res.status(404).json(createResponse({
      ok: false,
      status: 404,
      message: `The tab with id ${tabId} does not exist!`
    }));
  }

  for(let i = 0; i < articlesOrder.length; i++) {
    const articleIndex = articlesOrder[i];

    const article = await articleRepo.findOneBy({id: articleIndex});

    // This algorithm should not fail even if the article with the given id
    // does not exist, since this could happen in the middle of the array,
    // so fail might result in invalid `order` values (same in multiple articles)
    if(!article) {
      continue;
    }

    article.order = i;
    articleRepo.save(article);
  }

  return res.json(createResponse({
    ok: true,
    status: 200
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

  // Normalize order for the rest of the articles
  const restArticles = await articleRepo.findBy({tabId: foundArticle.tabId});

  for(let i = 0; i < restArticles.length; i++) {
    const currentArticle = restArticles[i];

    currentArticle.order = i;
    articleRepo.save(currentArticle);
  }

  return res.json(createResponse({
    status: 200,
    ok: true
  }));
};

/**
 * Note: this endpoint MUST NOT be included to the production bundle, it helps to
 * normalize the `order` property of the articles, so it can't be used as a route
 */
export const fillOrderField: Handler = async (_, res) => {
  const articlesRepo = DBSource.getRepository(Article);
  const tabsRepo = DBSource.getRepository(Tab);

  try {
    const allTabs = await tabsRepo.find();

    for(const tab of allTabs) {
      const allArticle = await articlesRepo.findBy({tabId: tab.id});

      for(let i = 0; i < allArticle.length; i++) {
        const article = allArticle[i];
        article.order = i;
        articlesRepo.save(article);
      }
    }

    return res.json(createResponse({
      ok: true,
      status: 200,
      message: "Successfully updated the order field!"
    }));

  } catch(error) {
    return res.status(500).json(createResponse({
      ok: false,
      status: 500,
      message: "Count not execute order normalize command!"
    }));
  }
};
