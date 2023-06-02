import { readFileSync } from "fs";
import { GraphQLSchema, buildSchema } from "graphql";
import path from "path";

export const loadSchema = (): GraphQLSchema => {
  // TODO: find a better way to write the path to the schema
  return buildSchema(readFileSync(path.resolve(process.cwd(), "src/_graphql/schema/schema.graphql"), "utf8"));
};
