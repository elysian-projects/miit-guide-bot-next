import { useEffect } from "react";
import { useRedirect } from "./useRedirect";
import { useSearchQuery } from "./useSearchQuery";

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

  return {
    page,
    take
  };
};
