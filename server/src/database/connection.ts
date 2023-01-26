import { PostgreSqlConnection } from "ts-sql-query/connections/PostgreSqlConnection";

export class PostgresConnection extends PostgreSqlConnection<"PostgresConnection"> {
  // increment(i: number) {
  //   return this.executeFunction("increment", [this.const(i, "int")], "int", "required");
  // }
  // appendToAllCompaniesName(additional: string) {
  //   return this.executeProcedure("append_to_all_companies_name", [this.const(additional, "string")]);
  // }
  // customerSeq = this.sequence("customer_seq", "int");
}
