import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { FC, useCallback, useContext, useEffect } from "react";
import { SidebarContext } from "../../contexts/sidebar";
import { sidebarContent } from "./content";
import {
  SidebarBlock,
  SidebarDivider,
  SidebarFrame,
  SidebarItem,
  SidebarLogo,
  SidebarToggleButton,
  SidebarWrapper
} from "./Sidebar.styles";
import { shouldSwitchMobileModeOff, shouldSwitchMobileModeOn } from "./utils";


export const Sidebar: FC = () => {
  const {open, view, setSidebarView, toggleSidebar} = useContext(SidebarContext);

  const handleWindowResize = useCallback(() => {
    if(shouldSwitchMobileModeOn(view)) {
      setSidebarView("curtain");
      toggleSidebar();
    } else if (shouldSwitchMobileModeOff(view)) {
      setSidebarView("fixed")
      !open && toggleSidebar();
    }
  }, [setSidebarView, view, open, toggleSidebar])

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize])

  const isAuth = true;

  return (
    <SidebarFrame onResize={handleWindowResize} className={`${open ? "open" : "closed"} ${view}`}>
      <SidebarToggleButton onClick={toggleSidebar} aria-label="toggleSidebar" size="large">
        {open ? (
          <KeyboardArrowLeft fontSize="large" />
        ) : (
          <KeyboardArrowRight fontSize="large" />
        )}
      </SidebarToggleButton>
      <SidebarWrapper>
        <SidebarBlock>
          <SidebarLogo>
            MIIT Guide Bot
          </SidebarLogo>
        </SidebarBlock>
        <SidebarBlock>
          <SidebarDivider />
        </SidebarBlock>
        <SidebarBlock>
          {sidebarContent.map(item => item.auth === isAuth && (
            <SidebarItem key={item.label} to={item.link}>
              {item.icon}
              {item.label}
            </SidebarItem>
          ))}
        </SidebarBlock>
      </SidebarWrapper>
    </SidebarFrame>
  )
}
