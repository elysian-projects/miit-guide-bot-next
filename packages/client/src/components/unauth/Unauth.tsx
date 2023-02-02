import { FC } from "react";
import { Wrapper } from "../wrapper/Wrapper.styles";
import { SigninForm } from "./SigninForm";

export const Unauth: FC = () => {
  return (
    <Wrapper style={{height: "100vh", position: "relative", alignItems: "center"}}>
      <Wrapper maxWidth="800px" style={{height: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <SigninForm />
      </Wrapper>
    </Wrapper>
  )
}
