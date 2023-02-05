import { createContext, FC, ReactElement } from "react";
import { useSidebar } from "../components/sidebar/useSidebar";

type SidebarContextValueType = {
  open: boolean,
  toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextValueType>({
  open: true,
  toggleSidebar: () => {}
});

interface ISidebarContextProviderProps {
  children: ReactElement
}

export const SidebarContextProvider: FC<ISidebarContextProviderProps> = ({children}) => {
  const {open, toggleSidebar} = useSidebar();

  return (
    <SidebarContext.Provider value={{open, toggleSidebar}}>
      {children}
    </SidebarContext.Provider>
  )
}
