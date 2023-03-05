import { isNumeric } from "common/src";

type IPaginationProps = {
  skip: number | undefined,
  take: number | undefined
};

const DEFAULT_TAKE = 12;

export const getPaginationProps = (page: unknown, take: unknown): IPaginationProps => {
  if(isValidPaginationPage(page)) {
    const normalizedTakeProp = getPaginationTakeProps(take);
    return {
      skip: (page - 1) * normalizedTakeProp,
      take: normalizedTakeProp
    };
  }

  return {
    skip: undefined,
    take: undefined
  };
};

export const isValidPaginationPage = (page: unknown): page is number & boolean  => {
  return isNumeric(page) && Number(page) > 0;
};

const getPaginationTakeProps = (queryTake: unknown): number => {
  return isNumeric(queryTake) ? Number(queryTake) : DEFAULT_TAKE;
};
