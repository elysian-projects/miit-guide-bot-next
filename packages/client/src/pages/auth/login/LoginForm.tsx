import { Button, TextField } from "@mui/material";
import { FC } from "react";
import { SigninFormCaption, SigninFormStyled } from "./Login.styles";

export const LoginForm: FC = () => {
  return (
    <SigninFormStyled method="post">
      <SigninFormCaption>Вход</SigninFormCaption>
      <TextField id="login" label="Логин" variant="standard" />
      <TextField id="password" label="Пароль" variant="standard" />
      <Button variant="contained" color="primary">Войти</Button>
    </SigninFormStyled>
  )
}
