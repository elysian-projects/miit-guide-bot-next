import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * The hook which works out when the page is loaded, and checks if the given `keys` are given as the query parameters.
 * If any of the key is not given, a redirect to the `redirectUrl` will be emitted. Overwise, the function will return
 * an object with the following keys and the values given as the query parameters.
 */
export const useOnLoad = <T extends string>(keys: T[], onError: () => void): Record<T, string> => {
  const [queryProps] = useSearchParams();

  const propsValues: Record<T, string> = {} as Record<T, string>;

  useEffect(() => {
    for(const key of keys) {
      const value = queryProps.get(key);

      if(!value) {
        onError();
        break;
      }

      propsValues[key] = value;
    }
  }, []);

  return propsValues;
};
