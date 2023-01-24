import { Client, QueryResult } from "pg";
import { DatabaseController } from "./types";

export class PostgreSQL implements DatabaseController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public query = async (query: string, args?: unknown[]): Promise<QueryResult<any>> => {
    const client = this.getClient();
    await client.connect();

    const res = await client.query(query, args);

    client.end();

    return res;
  };

  private getClient = (): Client => {
    const client = new Client({
      connectionString: this.getConnectionString(),
    });

    return client;
  };

  private getConnectionString = (): string => {
    return "jdbc:postgresql:/miit";
  };
}
