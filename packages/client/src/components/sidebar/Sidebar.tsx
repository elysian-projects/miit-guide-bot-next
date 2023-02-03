import { FC } from "react";
import { sidebarContent } from "./content";
import {
  SidebarBlock,
  SidebarDivider,
  SidebarFrame,
  SidebarItem,
  SidebarLogo,
  SidebarWrapper
} from "./Sidebar.styles";

export const Sidebar: FC = () => {
  const isAuth = true;

  return (
    <SidebarFrame>
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
