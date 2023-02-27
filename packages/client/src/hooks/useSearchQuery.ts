import { useSearchParams } from "react-router-dom";

export const useSearchQuery = () => {
  const [queryProps] = useSearchParams();

  const getQueryProp = (key: string): string | null => {
    return queryProps.get(key);
  }

  return {
    getQueryProp
  }
}
