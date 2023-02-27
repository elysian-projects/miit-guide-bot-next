import { DBSource } from "@/database/data-source";
import { Article } from "@/entity/articles";
import { Tab } from "@/entity/tabs";
import { useOrderBy } from "@/utils/orderBy";
import { createResponse } from "@/utils/response";
import { getValidSelectArray } from "@/utils/selectValidation";
import { serializeTabLabel } from "@/utils/serializer";
import { isValidId, isValidTabBody } from "@/utils/validations";
import { Handler } from "express";

export const getTabs: Handler = async (req, res) => {
  const {select, orderBy, ...query} = req.query;

  const selectList = getValidSelectArray(select, new Tab());
  const order = useOrderBy(orderBy, new Tab());

  if(orderBy && !order) {
    res.json(createResponse({
      status: 400,
      ok: false,
      message: "Невалидные данные!"
    }));

    return;
  }

  const tabs = await DBSource.getRepository(Tab).find({
    where: query,
    select: selectList,
    order: order ?? {}
  });

  if(tabs.length === 0) {
    res.status(404).json(createResponse({
      status: 404,
      ok: false,
      message: "Вкладка не найдена!"
    }));

    return;
  }

  res.status(200).json(createResponse({
    status: 200,
    ok: true,
    data: tabs
  }));
};

export const insertTab: Handler = async (req, res) => {
  const body = req.body;

  if(!isValidTabBody(body)) {
    res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Невалидные данные!"
    }));

    return;
  }

  const {label, type} = body;
  const tabValue = serializeTabLabel(label);

  const existingTab = await DBSource.getRepository(Tab).countBy({
    label
  });

  if(existingTab !== 0) {
    res.status(409).json(createResponse({
      status: 409,
      ok: false,
      message: "Вкладка с таким названием уже существует!"
    }));

    return;
  }

  const tab = new Tab();
  tab.label = String(label);
  tab.value = tabValue;
  tab.type = String(type);

  await DBSource.getRepository(Tab).save(tab);

  res.status(201).json(createResponse({
    status: 201,
    ok: true
  }));
};

export const updateTab: Handler = async (req, res) => {
  const body = req.body;

  const {id, label, type} = body;

  if(!isValidId(id)) {
    res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Неверный ID!"
    }));

    return;
  }

  if(!label && !type) {
    res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Невалидные данные!"
    }));

    return;
  }

  const tabRepo = DBSource.getRepository(Tab);

  const foundTab = await tabRepo.findOneBy({
    id: Number(id)
  });

  if(!foundTab) {
    res.status(404).json(createResponse({
      status: 404,
      ok: false,
      message: "Вкладка не найдена!"
    }));

    return;
  }

  const tabValue = (label)
    ? serializeTabLabel(label)
    : null;

  label && (foundTab.label = label);
  tabValue && (foundTab.value = tabValue);
  type && (foundTab.type = type);

  tabRepo.save(foundTab);

  res.json(createResponse({
    status: 200,
    ok: true
  }));
};

export const deleteTab: Handler = async (req, res) => {
  const {id: bodyId} = req.body;
  const {id: queryId} = req.query;

  if(!isValidId(bodyId) && !isValidId(queryId)) {
    res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "ID вкладки отсутствует!"
    }));

    return;
  }

  const id = Number(bodyId ?? queryId);

  const tabRepo = DBSource.getRepository(Tab);
  const articleRepo = DBSource.getRepository(Article);
  const foundTab = await tabRepo.findOneBy({id});

  if(!foundTab) {
    res.status(404).json(createResponse({
      status: 404,
      ok: false,
      message: "Вкладка не найдена!"
    }));

    return;
  }

  // All articles must also be deleted when the tab is deleted
  const articlesOfTheGivenTab = await articleRepo.findBy({tabId: foundTab.id});

  for(const article of articlesOfTheGivenTab) {
    await articleRepo.delete(article);
  }

  await tabRepo.delete(foundTab);

  res.json(createResponse({
    status: 200,
    ok: true
  }));
};
