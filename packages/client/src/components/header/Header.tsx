import { FC } from "react";
import { HeaderContainer, HeaderItem, HeaderLogo, HeaderSection, HeaderWrapper } from "./Header.styles";
import { HeaderUserMenu } from "./HeaderUserMenu";

export const Header: FC = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <HeaderSection>
          <HeaderLogo>MIIT Guide Bot</HeaderLogo>
        </HeaderSection>
        <HeaderSection>
          <HeaderItem>
            <HeaderUserMenu />
          </HeaderItem>
        </HeaderSection>
      </HeaderWrapper>
    </HeaderContainer>
  )
}
