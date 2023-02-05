import { Menu } from "@mui/icons-material";
import { FC, useContext } from "react";
import { SidebarContext } from "../../contexts/sidebar";
import { SidebarToggleButton } from "./Header.styles";

export const HeaderSidebarToggler: FC = () => {
  const {open, toggleSidebar} = useContext(SidebarContext);

  const getToggleButtonClass = (): string => {
    return (!open && window.innerWidth < 1170) ? "show" : "";
  }

  return (
    <SidebarToggleButton className={getToggleButtonClass()} size="medium" onClick={toggleSidebar} aria-label="toggleSidebar">
      <Menu fontSize="large" />
    </SidebarToggleButton>
  )
}
