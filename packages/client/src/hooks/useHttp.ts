import { IResponse } from "common/dist";
import { useEffect, useState } from "react";
import { QueryFunction, useQuery } from "react-query";

type HttpResponseType<K extends object> = IResponse<K> | null;

export const useHttp = <
  K extends object,
  T extends string = string
>(
  queryKey: T,
  queryFunction: QueryFunction<HttpResponseType<K>, T>,
) => {
  const [error, setError] = useState<string | null>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [response, setResponse] = useState<HttpResponseType<K>>(null);
  const [status, setStatus] = useState<"error" | "idle" | "loading" | "success">("idle");

  const query = useQuery(queryKey, queryFunction, {
    onError: (err: any) => {
      setError(err.response?.data?.message);
    },
    onSuccess: (response) => {
      setResponse(response);
    }
  });

  useEffect(() => {
    setIsFetching(query?.status === "loading");
    setStatus(query?.status)
  }, [query]);

  return {
    isFetching,
    response,
    status,
    error
  }
}
