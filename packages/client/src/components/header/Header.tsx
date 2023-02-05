import { FC } from "react";
import { HeaderContainer, HeaderItem, HeaderSection, HeaderWrapper } from "./Header.styles";
import { HeaderSidebarToggler } from "./HeaderSidebarToggler";
import { HeaderUserMenu } from "./HeaderUserMenu";

export const Header: FC = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <HeaderSection>
          <HeaderSidebarToggler />
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
