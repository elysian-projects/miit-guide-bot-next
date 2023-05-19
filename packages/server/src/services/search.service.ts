import { ARTICLES_REGISTRY, VALID_REGISTRY_VALUES } from "@/constants/registry";
import { DBSource } from "@/database/data-source";
import { Article } from "@/entity/articles";
import { Tab } from "@/entity/tabs";
import { createResponse } from "@/utils/response";
import { Handler } from "express";
import { ILike } from "typeorm";

export const search: Handler = async (req, res) => {
  const {registry, key, value} = req.query;

  if(!registry || typeof registry !== "string" || !VALID_REGISTRY_VALUES.includes(registry)) {
    return res.status(400).json(createResponse({
      ok: false,
      status: 400,
      message: "Invalid registry name!"
    }));
  }

  if(!key || typeof key !== "string" || !value || typeof value !== "string") {
    return res.status(400).json(createResponse({
      ok: false,
      status: 400,
      message: "Invalid search query: key or value were not found!"
    }));
  }

  const repo = registry === ARTICLES_REGISTRY
    ? DBSource.getRepository(Article)
    : DBSource.getRepository(Tab);

  try {
    const response = await repo.findBy({
      [key]: ILike(`%${value}%`)
    });

    if(!response) {
      return res.status(404).json(createResponse({
        ok: false,
        status: 404,
        message: "Ничего не найдено!"
      }));
    }

    return res.json(createResponse({
      ok: true,
      status: 200,
      data: response
    }));
  } catch(error) {
    console.log(error);

    return res.status(500).json(createResponse({
      ok: false,
      status: 500,
      message: "Что-то пошло не так!"
    }));
  }
};
