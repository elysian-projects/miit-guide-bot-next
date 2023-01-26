import { Pool } from "pg";
import { ConsoleLogQueryRunner } from "ts-sql-query/queryRunners/ConsoleLogQueryRunner";
import { PgPoolQueryRunner } from "ts-sql-query/queryRunners/PgPoolQueryRunner";
import { PostgresConnection } from "./connection";

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT)
});

export class PostgreSQL {
  public getConnection = (): PostgresConnection => {
    const connection = new PostgresConnection(new ConsoleLogQueryRunner(new PgPoolQueryRunner(pool)));
    connection.beginTransaction();
    return connection;
  };
}
