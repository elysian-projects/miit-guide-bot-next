import { Article } from "@/entity/articles";
import { Tab } from "@/entity/tabs";
import { Token } from "@/entity/tokens";
import { User } from "@/entity/users";
import { config as dotenvConfig } from "dotenv";
import { expand } from "dotenv-expand";
import "reflect-metadata";
import { DataSource } from "typeorm";

expand(dotenvConfig({path: "../../.env"}));

export const DBSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL || "",
  synchronize: true,
  logging: false,
  entities: [Article, Tab, User, Token],
  migrations: [],
  subscribers: [],
});
