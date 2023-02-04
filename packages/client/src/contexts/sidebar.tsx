import { createContext, FC, ReactElement } from "react";
import { SidebarState, SidebarView } from "../components/sidebar/types";
import { useSidebar } from "../components/sidebar/useSidebar";

type SidebarContextValueType = SidebarState & {
  setSidebarView: (view: SidebarView) => void,
  toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextValueType>({
  open: true,
  view: "fixed",
  setSidebarView: () => {},
  toggleSidebar: () => {}
});

interface ISidebarContextProviderProps {
  children: ReactElement
}

export const SidebarContextProvider: FC<ISidebarContextProviderProps> = ({children}) => {
  const {state, setSidebarView, toggleSidebar} = useSidebar();

  return (
    <SidebarContext.Provider value={{...state, setSidebarView, toggleSidebar}}>
      {children}
    </SidebarContext.Provider>
  )
}
