import { Article } from "@/entity/articles";

export type ApiResponse = {
  data: Article | Article[],
  pagination: {
    pages: number,
    itemsPerPage: number
  }
}
