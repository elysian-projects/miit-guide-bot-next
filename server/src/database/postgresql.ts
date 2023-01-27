import { Pool } from "pg";
import { ConsoleLogQueryRunner } from "ts-sql-query/queryRunners/ConsoleLogQueryRunner";
import { PgPoolQueryRunner } from "ts-sql-query/queryRunners/PgPoolQueryRunner";
import { PostgresConnection } from "./connection";

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  connectionString: process.env.PGCONNECTION_STRING
});

export class PostgreSQL {
  public getConnection = async (): Promise<PostgresConnection> => {
    const connection = new PostgresConnection(new ConsoleLogQueryRunner(new PgPoolQueryRunner(pool)));
    await connection.beginTransaction();
    return connection;
  };
}
