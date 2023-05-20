import { isNumeric } from "common/dist";

type IPaginationProps = {
  skip: number,
  take: number
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
    skip: 0,
    take: DEFAULT_TAKE
  };
};

export const isValidPaginationPage = (page: unknown): page is number & boolean  => {
  return isNumeric(page) && Number(page) > 0;
};

const getPaginationTakeProps = (queryTake: unknown): number => {
  return isNumeric(queryTake) ? Number(queryTake) : DEFAULT_TAKE;
};
