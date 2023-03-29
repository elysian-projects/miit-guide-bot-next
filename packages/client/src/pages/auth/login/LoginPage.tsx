import { FC } from "react";
import { LoginForm } from "../../../widgets/LoginForm/LoginForm";
import { LoginPageWrapper } from "./LoginPage.styles";

export const LoginPage: FC = () => {
  return (
    <LoginPageWrapper>
      <LoginForm />
    </LoginPageWrapper>
  );
};
