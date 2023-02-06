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

    if(query.data?.message) {
      setError(query.data?.message);
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
