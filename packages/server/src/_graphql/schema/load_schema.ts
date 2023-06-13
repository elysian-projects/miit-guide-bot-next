import fs, { readFileSync, } from "fs";
import { GraphQLSchema, buildSchema } from "graphql";
import path from "path";

const BASE_PATH = path.resolve(process.cwd(), "src/_graphql/schema/entities");

export const loadSchema = (): GraphQLSchema => {
  const filesData = loadSchemasPaths().map(file => readFile(path.resolve(BASE_PATH, file)));
  return buildSchema(filesData.join(""));
};

const readFile = (filePath: string): string => {
  return readFileSync(filePath, "utf8");
};

const loadSchemasPaths = (): string[] => {
  return fs.readdirSync(BASE_PATH, {encoding: "utf8"});
};
