import { Pagination } from "@mui/material";
import { FC } from "react";
import styled from "styled-components";
import { usePagination } from "../../hooks/usePagination";

const PaginationBarStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
`;

interface IPaginationBarProps {
  count: number;
  baseUrl: string;
}

export const PaginationBar: FC<IPaginationBarProps> = ({count, baseUrl}) => {
  const pagination = usePagination(baseUrl);

  return (
    <PaginationBarStyled>
      <Pagination onChange={(_, page) => pagination.changePage(page)} count={count} page={pagination.page} variant="outlined" shape="rounded" />
    </PaginationBarStyled>
  );
};
