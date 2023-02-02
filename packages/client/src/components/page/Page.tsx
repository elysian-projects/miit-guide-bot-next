import { FC, ReactElement } from "react";
import { Sidebar } from "../sidebar";
import { PageStyled } from "./Page.styles";

interface IPageProps {
  children: ReactElement
}

export const Page: FC<IPageProps> = ({children}) => {
  return (
    <PageStyled>
      <Sidebar />
      <main style={{position: "relative", width: "100%"}}>
        {children}
      </main>
    </PageStyled>
  )
}
