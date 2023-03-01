import { ContentNode } from "../types";

export type SearchOptions<T extends object> = {
  [key in keyof T]: string
} & {
  where?: Partial<T>,
  select?: string[],
  orderBy?: string,
  page?: string | null,
  take?: string | null,
}

export type Data = {
  status: number,
  content?: ContentNode[]
}
