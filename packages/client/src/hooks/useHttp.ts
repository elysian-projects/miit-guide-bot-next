import { useEffect, useState } from "react";
import { QueryFunction, useQuery } from "react-query";
import { IResponse } from "../../../common/src";

type HttpResponseType<K extends object> = IResponse<K> | null;

export const useHttp = <K extends object, T extends string = string>(queryKey: T, queryFunction: QueryFunction<HttpResponseType<K>, T>) => {
  const [error, setError] = useState<string | null>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [response, setResponse] = useState<HttpResponseType<K>>(null);
  const [status, setStatus] = useState<"error" | "idle" | "loading" | "success">("idle");

  const query = useQuery(queryKey, queryFunction);

  useEffect(() => {
    setIsFetching(query?.status === "loading");
    setStatus(query?.status)

    if(query.data?.message || (query.error as any)?.response.status > 299) {
      // TODO: get rid of this `any` statement (find library module typing?)
      // TODO: move concat to an external function
      setError(query.data?.message || `(${(query.error as any)?.response.status}) ` + (query.error as any)?.response.statusText);
    }
    if(query.data) {
      setResponse(query.data);
    }

  }, [query]);

  return {
    isFetching,
    response,
    status,
    error
  }
}
