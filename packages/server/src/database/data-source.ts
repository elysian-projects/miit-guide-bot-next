import { Article } from "@/entity/articles";
import { Tab } from "@/entity/tabs";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const DBSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL || "",
    synchronize: true,
    logging: false,
    entities: [Article, Tab],
    migrations: [],
    subscribers: [],
});
