import { readFileSync } from "fs";
import { GraphQLSchema, buildSchema } from "graphql";
import path from "path";

export const loadSchema = (): GraphQLSchema => {
  return buildSchema(readFileSync(path.resolve(process.cwd(), "src/graphql/schemas/schema.graphql"), "utf8"));
};
