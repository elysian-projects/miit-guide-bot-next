import { isNumeric } from "common/src";

export const parseQueryNumber = (queryId: string): number | null => {
  return isNumeric(queryId) ? parseInt(queryId) : null;
};
