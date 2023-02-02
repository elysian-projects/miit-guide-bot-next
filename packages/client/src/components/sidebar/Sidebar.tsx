import { Article, Home, Login, Logout, Storage } from "@mui/icons-material";
import { FC } from "react";
import {
  SidebarBlock,
  SidebarDivider,
  SidebarFrame,
  SidebarItem,
  SidebarLogo,
  SidebarWrapper
} from "./Sidebar.styles";

export const Sidebar: FC = () => {
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
          <SidebarItem href="/">
            <Home />
            Главная
          </SidebarItem>
          <SidebarItem href="/">
            <Storage />
            Вкладки
          </SidebarItem>
          <SidebarItem href="/">
            <Article />
            Статьи
          </SidebarItem>
          <SidebarItem href="/auth/login">
            <Login />
            Вход
          </SidebarItem>
          <SidebarItem href="/auth/logout">
            <Logout />
            Выход
          </SidebarItem>
        </SidebarBlock>
      </SidebarWrapper>
    </SidebarFrame>
  )
}
