import { FC } from "react";
import { Wrapper } from "../../components/wrapper/Wrapper.styles";
import { LoginForm } from "./LoginForm";

export const LoginPage: FC = () => {
  return (
    <Wrapper maxWidth="800px" style={{height: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <LoginForm />
    </Wrapper>
  )
}
