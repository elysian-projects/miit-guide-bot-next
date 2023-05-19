import { useEffect } from "react";
import { useRedirect } from "./useRedirect";
import { useSearchQuery } from "./useSearchQuery";

const DEFAULT_TAKE = 12;

export const usePagination = (baseUrl: string) => {
  const {getQueryProp} = useSearchQuery();
  const {redirect} = useRedirect();

  const page = getQueryProp("page");
  const take = getQueryProp("take");

  useEffect(() => {
    if(!page) {
      redirect(`${baseUrl}?page=1`);
    }
  }, [page]);

  const changePage = (page: number) => {
    redirect(`${baseUrl}?page=${page}`);
  };

  return {
    page: page ? parseInt(page) : 1,
    take: take ? parseInt(take) : DEFAULT_TAKE,
    changePage
  };
};
