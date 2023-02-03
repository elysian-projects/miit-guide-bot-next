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
          <SidebarItem to="/">
            <Home />
            Главная
          </SidebarItem>
          <SidebarItem to="/">
            <Storage />
            Вкладки
          </SidebarItem>
          <SidebarItem to="/content/articles">
            <Article />
            Статьи
          </SidebarItem>
          <SidebarItem to="/auth/login">
            <Login />
            Вход
          </SidebarItem>
          <SidebarItem to="/auth/logout">
            <Logout />
            Выход
          </SidebarItem>
        </SidebarBlock>
      </SidebarWrapper>
    </SidebarFrame>
  )
}
