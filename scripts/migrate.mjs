// @ts-check

import { config as dotEnvConfig } from "dotenv";
import { resolve } from "path";
import { migrate } from "postgres-migrations";
import { env } from "process";

dotEnvConfig();

(async () => {
  const migrationsPath = resolve("migrations");

  const config = {
    database: env.DBNAME || "miit",
    user: env.USER_NAME || "postgres",
    password: env.PASSWORD || "admin",
    host: env.HOST || "localhost",
    port: Number(env.PORT) || 5432,
    ensureDatabaseExists: true,
    defaultDatabase: "postgres"
  };

  await migrate(config, migrationsPath);
})();
