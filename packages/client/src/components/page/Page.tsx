import { FC, ReactNode } from "react";
import { PageStyled } from "./Page.styles";

interface IPageProps {
  children: ReactNode
}

export const Page: FC<IPageProps> = ({children}) => {
  return (
    <PageStyled>
      {children}
    </PageStyled>
  )
}
