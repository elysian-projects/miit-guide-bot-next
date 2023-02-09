import { Article } from "@/entity/articles";
import { Tab } from "@/entity/tabs";
import { Token } from "@/entity/tokens";
import { User } from "@/entity/users";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const DBSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL || "",
    synchronize: true,
    logging: false,
    entities: [Article, Tab, User, Token],
    migrations: [],
    subscribers: [],
});
