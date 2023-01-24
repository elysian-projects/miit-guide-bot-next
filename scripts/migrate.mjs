// @ts-check

import { config as dotEnvConfig } from "dotenv";
import { resolve } from "path";
import { migrate } from "postgres-migrations";
import { env } from "process";

dotEnvConfig();

(async () => {
  const migrationsPath = resolve("migrations");

  const config = {
    database: env.PGDATABASE || "miit",
    user: env.PGUSER || "docker",
    password: env.PGPASSWORD || "admin",
    host: env.PGHOST || "localhost",
    port: Number(env.PGPORT) || 5432,
    ensureDatabaseExists: true
  };

  await migrate(config, migrationsPath);
})();
