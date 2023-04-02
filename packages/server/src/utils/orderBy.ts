type Order = "DESC" | "desc" | "ASC" | "asc";

export const useOrderBy = <T extends object>(orderByQuery: unknown | undefined, object: T): {[key: string]: Order} | null => {
  if(!orderByQuery || typeof orderByQuery !== "string") {
    return null;
  }

  const entries = orderByQuery.split(".");

  if(!validateEntries(entries, object)) {
    return null;
  }

  const [key, order] = entries;

  return {
    [key]: order
  };
};

const validateEntries = <T extends object>(entries: string[], object: T): entries is [string, Order] => {
  return (entries.length === 2 && Object.keys(object).includes(entries[0]) && availableOrder.includes(entries[1] as Order));
};

const availableOrder: Order[] = ["DESC", "ASC", "asc", "desc"];
