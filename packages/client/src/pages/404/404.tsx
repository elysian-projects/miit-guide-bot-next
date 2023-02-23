import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { NotFoundCode, NotFoundWrapper } from "./404.styles";

export const NotFoundPage: FC = () => {
  return (
    <NotFoundWrapper>
      <NotFoundCode>404</NotFoundCode>
      <Typography variant="h4">Страница не найдена!</Typography>
      <Typography variant="subtitle2" lineHeight={1.3} fontSize={16}>
        Страница, которую вы ищите, не найдена. Возможно, она была перенесена, удалена или временно недоступна.
        Проверьте правильность введённого адреса или обратитесь к администратору.
      </Typography>
      <Link to="/">
        <Button variant="contained" color="error">
          В меню
        </Button>
      </Link>
    </NotFoundWrapper>
  );
};
