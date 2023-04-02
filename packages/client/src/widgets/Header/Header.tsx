import { CSSProperties, FC, useEffect, useState } from "react";
import { SIDEBAR_WIDTH } from "../Sidebar/Sidebar.styles";
import { HeaderContainer, HeaderItem, HeaderSection, HeaderWrapper } from "./Header.styles";
import { HeaderSidebarToggler } from "./HeaderSidebarToggler";
import { HeaderUserMenu } from "./HeaderUserMenu";

const getHeaderContainerStyles = (): CSSProperties => {
  return (window.innerWidth >= 1170)
    ? {
      width: `calc(100% - ${SIDEBAR_WIDTH})`,
      left: SIDEBAR_WIDTH
    } : {
      width: "100%",
      left: 0
    };
};

export const Header: FC = () => {
  const [styles, setStyles] = useState<CSSProperties>(getHeaderContainerStyles());

  // FIXME: invokes too much
  const handleResize = () => {
    setStyles(getHeaderContainerStyles());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HeaderContainer style={styles} color="inherit">
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
  );
};
