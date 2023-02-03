import { Typography } from "@mui/material";
import { FC } from "react";
import { Wrapper } from "../../components/wrapper";

export const NotFoundPage: FC = () => {
  return (
    <Wrapper>
      <Typography variant="h2">404!</Typography>
      <Typography variant="h4">Страница не найдена!</Typography>
    </Wrapper>
  )
}
