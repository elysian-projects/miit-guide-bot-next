import { DBSource } from "@/database/data-source";
import { Tab } from "@/entity/tabs";
import { createResponse } from "@/utils/response";
import { serializeTabLabel } from "@/utils/serializer";
import { isValidId, isValidTabBody } from "@/utils/validations";
import { Handler } from "express";

export const getTabs: Handler = async (req, res) => {
  const {id, label, value, type} = req.query;

  const conditions: Partial<Tab> = {};

  id && (conditions.id = Number(id));
  label && (conditions.label = String(label));
  value && (conditions.value = String(value));
  type && (conditions.type = String(type));

  const tabs = await DBSource.getRepository(Tab).find({
    where: conditions,
    order: {
      id: "DESC"
    }
  });

  if(tabs.length === 0) {
    res.status(404).json(createResponse({
      status: 404,
      ok: false,
      message: "No tabs found"
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
      message: "Invalid data!"
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
      message: "A tab with given name already exists!"
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
      message: "Invalid id!"
    }));

    return;
  }

  if(!label && !type) {
    res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Invalid data!"
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
      message: "No tab found!"
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

  if(!hasValidId(bodyId, queryId)) {
    res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Tab id was not provided!"
    }));

    return;
  }

  const id = Number(bodyId ?? queryId);

  const tabRepo = DBSource.getRepository(Tab);
  const foundTab = await tabRepo.findOneBy({
    id
  });

  if(!foundTab) {
    res.status(404).json(createResponse({
      status: 404,
      ok: false,
      message: "No tab found!"
    }));

    return;
  }

  await tabRepo.delete(foundTab);

  res.json(createResponse({
    status: 200,
    ok: true
  }));
};

const hasValidId = (id1: unknown, id2: unknown): boolean => {
  return (!id1 && !id2) || (isNaN(Number(id1)) && isNaN(Number(id2))) === false;
};
