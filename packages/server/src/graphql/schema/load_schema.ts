import { readFileSync } from "fs";
import { GraphQLSchema, buildSchema } from "graphql";
import path from "path";

console.log(path.resolve("./schema.graphql"));

export const loadSchema = (): GraphQLSchema => {
  return buildSchema(readFileSync(path.resolve("./schema.graphql"), "utf8"));
};
