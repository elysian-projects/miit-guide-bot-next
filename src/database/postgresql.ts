import { Client, QueryResult } from "pg";
import { DatabaseController } from "./types";

export class PostgreSQL implements DatabaseController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public query = async (query: string, args?: unknown[]): Promise<QueryResult<any>> => {
    const client = await this.connect();
    const res = await client.query(query, args);

    client.end();

    return res;
  };

  private connect = async (): Promise<Client> => {
    const client = new Client({
      database: process.env.DBNAME,
      host: process.env.HOST,
      port: Number(process.env.PORT),
      user: process.env.USER,
      password: process.env.PASSWORD
    });

    await client.connect();
    return client;
  };
}
