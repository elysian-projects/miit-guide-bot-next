import { FC, ReactElement } from "react";
import { MainWrapper } from "../../components/wrapper";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
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
