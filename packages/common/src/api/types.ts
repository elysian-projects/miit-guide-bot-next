import { ContentNode } from "../types";

export type SearchOptions = {
  [key in keyof ContentNode]: string
} & {
  select?: string[],
}

export type Data = {
  status: number,
  content?: ContentNode[]
}
