import { FC } from "react";
import { LoginForm } from "./LoginForm";

export const LoginPage: FC = () => {
  return (
    <div style={{height: "50vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <LoginForm />
    </div>
  );
};
