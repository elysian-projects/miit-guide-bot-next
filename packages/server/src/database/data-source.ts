import { Article } from "@/entity/articles";
import { Tab } from "@/entity/tabs";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const DBSource = new DataSource({
    type: "postgres",
    // host: process.env.PGHOST || "localhost",
    // port: Number(process.env.PGPORT) || 5432,
    // username: process.env.PGUSER || "docker",
    // password: process.env.PGPASSWORD || "admin",
    // database: process.env.PGDATABASE || "miit",
    url: process.env.DATABASE_URL || "",
    synchronize: true,
    logging: false,
    entities: [Article, Tab],
    migrations: [],
    subscribers: [],
});
