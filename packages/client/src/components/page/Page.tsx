import { FC, ReactElement } from "react";
import { Header } from "../header";
import { Sidebar } from "../sidebar";
import { MainWrapper } from "../wrapper";
import { PageStyled } from "./Page.styles";

interface IPageProps {
  children: ReactElement
}

export const Page: FC<IPageProps> = ({children}) => {
  return (
    <PageStyled>
      <Sidebar />
      <main style={{position: "relative", width: "100%", marginTop: "60px"}}>
        <Header />
        <MainWrapper>
          {children}
        </MainWrapper>
      </main>
    </PageStyled>
  );
};
