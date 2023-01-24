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

  public connect = async (): Promise<Client> => {
    const client = new Client({
      connectionString: this.getConnectionString(),
      user: "postgres",
      password: "admin"
    });

    await client.connect();
    return client;
  };

  private getConnectionString = (): string => {
    return "jdbc:postgresql://localhost:5432/miit";
  };
}
