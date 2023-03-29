import { Pagination as MUIPagination } from "@mui/material";
import { FC } from "react";

interface IPaginationProps {
  count: number,
  onChangePage?: (page: number) => void
}

export const Pagination: FC<IPaginationProps> = ({
  count,
  onChangePage
}) => {
  return (
    <MUIPagination onChange={(_, value) => onChangePage?.(value)} count={count} />
  );
};
