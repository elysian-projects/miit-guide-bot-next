import { Article, Home, Login, Logout, Storage } from "@mui/icons-material";
import { ReactElement } from "react";

export type SidebarContentType = {
  label: string,
  link: string,
  auth: boolean,
  icon: ReactElement,
}

export const sidebarContent: SidebarContentType[] = [
  {label: "Главная", link: "/", auth: true, icon: (<Home />)},
  {label: "Вкладки", link: "/content/tabs", auth: true, icon: (<Storage />)},
  {label: "Статьи", link: "/content/articles", auth: true, icon: (<Article />)},
  {label: "Вход", link: "/auth/login", auth: false, icon: (<Login />)},
  {label: "Выход", link: "/auth/logout", auth: true, icon: (<Logout />)},
];
