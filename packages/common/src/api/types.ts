import { ContentNode } from "../types";

export type SearchOptions<T extends object> = {
  [key in keyof T]: string
} & {
  where?: Partial<T>,
  select?: string[],
  orderBy?: string
}

export type Data = {
  status: number,
  content?: ContentNode[]
}
