import { createContext, FC, ReactElement } from "react";
import { useSidebar } from "../widgets/Sidebar/useSidebar";

type SidebarContextValueType = {
  open: boolean,
  toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextValueType>({
  open: true,
  toggleSidebar: () => 0
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
  );
};
