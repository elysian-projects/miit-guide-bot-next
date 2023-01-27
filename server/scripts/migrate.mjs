/**
 * This script is required because of the specific location of the `.env` file. As it
 * is only exported properly on `docker compose up`, at development time the virtual path
 * does not actually match the "physical" path to the `.env` file, so it can't be just
 * ran as a casual npm script. This script file fixes the problem with the paths just
 * manually importing config file from the outer directory so it work just fine
 */

// @ts-check

import { exec } from "child_process";
import { config as dotenvConfig } from "dotenv";
import { expand as dotenvExpand } from "dotenv-expand";
import { resolve } from "path";
import { stdout } from "process";

dotenvExpand(dotenvConfig({path: resolve("../.env")}));

(async () => {
  const migration = exec("npx prisma migrate dev --name postgres-init", (err) => {
    if(err) {
      stdout.write("Failed to migrate!\n");
      stdout.write(err.message);
    }
  });

  migration.on("end", (code) => {
    stdout.write("Process finished with code: " + code);
  });
})();
