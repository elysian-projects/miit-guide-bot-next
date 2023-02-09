import { KeyboardArrowLeft } from "@mui/icons-material";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../contexts/sidebar";
import { useAuth } from "../../hooks/useAuth";
import { sidebarContent } from "./content";
import {
  SidebarBlock,
  SidebarDarkBackground,
  SidebarDivider,
  SidebarFrame,
  SidebarItem,
  SidebarLinkItem,
  SidebarLogo, SidebarWrapper
} from "./Sidebar.styles";


export const Sidebar: FC = () => {
  const {open, toggleSidebar} = useContext(SidebarContext);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, [isAuthenticated])

  const getSecondaryElementShowClass = (): string => {
    return (open && window.innerWidth <= 1170) ? "show" : "";
  }

  const handleClick = () => {
    if(window.innerWidth < 1170) {
      toggleSidebar();
    }
  }

  const resizeHandler = useCallback(() => {
    if(window.innerWidth <= 1170 && open) {
      toggleSidebar();
    }
  }, [open, toggleSidebar])

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [open, toggleSidebar, resizeHandler])

  return (
    <SidebarFrame className={`${(!open && window.innerWidth <= 1170) ? "closed" : ""}`}>
      <SidebarDarkBackground onClick={toggleSidebar} className={getSecondaryElementShowClass()} />
      <SidebarWrapper>
        <SidebarBlock>
          <SidebarLogo>
            MIIT Guide Bot
          </SidebarLogo>
        </SidebarBlock>
        <SidebarBlock>
          <SidebarDivider />
        </SidebarBlock>
        <SidebarBlock style={{height: "100%", justifyContent: "space-between"}}>
          <SidebarBlock>
            {sidebarContent.map(item => item.auth === isAuth && (
              <SidebarLinkItem to={item.link} onClick={handleClick} key={item.label}>
                {item.icon}
                {item.label}
              </SidebarLinkItem>
            ))}
          </SidebarBlock>
          <SidebarBlock>
            {(open && window.innerWidth <= 1170) && (
              <SidebarItem onClick={toggleSidebar}>
                <KeyboardArrowLeft />
                Закрыть
              </SidebarItem>
            )}
          </SidebarBlock>
        </SidebarBlock>
      </SidebarWrapper>
    </SidebarFrame>
  )
}
