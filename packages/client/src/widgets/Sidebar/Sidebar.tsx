import { KeyboardArrowLeft } from "@mui/icons-material";
import { FC, useContext, useState } from "react";
import { SidebarContext } from "../../contexts/sidebar";
import { useAuth } from "../../hooks/useAuth";
import { useWindowResizeHandler } from "../../hooks/useWindowResizeHandler";
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
import {
  getSecondaryElementShowClass,
  getSidebarFrameClass,
  isMobileWindow
} from "./utils";

export const Sidebar: FC = () => {
  const {isAuthenticated} = useAuth();
  const [isAuth] = useState<boolean>(isAuthenticated());

  const {open, toggleSidebar} = useContext(SidebarContext);

  /**
   * This function toggled the sidebar if the given condition is true
   * @param {boolean} condition - the condition to check before toggling
   */
  const toggleSidebarOnCondition = (condition: boolean): void => {
    if(condition) {
      toggleSidebar();
    }
  };

  useWindowResizeHandler(() => toggleSidebarOnCondition(open && isMobileWindow()));

  return (
    <SidebarFrame className={getSidebarFrameClass(open)}>
      <SidebarDarkBackground onClick={toggleSidebar} className={getSecondaryElementShowClass(open)} />
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
              <SidebarLinkItem to={item.link} onClick={() => toggleSidebarOnCondition(isMobileWindow())} key={item.label}>
                {item.icon}
                {item.label}
              </SidebarLinkItem>
            ))}
          </SidebarBlock>
          <SidebarBlock>
            {(open && isMobileWindow()) && (
              <SidebarItem onClick={toggleSidebar}>
                <KeyboardArrowLeft />
                Закрыть
              </SidebarItem>
            )}
          </SidebarBlock>
        </SidebarBlock>
      </SidebarWrapper>
    </SidebarFrame>
  );
};
