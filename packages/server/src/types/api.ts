export type ApiResponse<T> = {
  data: T | T[],
  pagination: {
    pages: number,
    itemsPerPage: number
  }
}
