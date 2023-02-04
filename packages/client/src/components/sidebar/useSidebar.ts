import { useState } from "react";
import { SidebarState, SidebarView } from "./types";

export const useSidebar = () => {
  const [state, setState] = useState<SidebarState>({open: true, view: "fixed"});

  const toggleSidebar = (): void => {
    setState({...state, open: !state.open});
  }

  const setSidebarView = (view: SidebarView): void => {
    if(state.view !== view) {
      setState({...state, view});
    }
  }

  return {
    state,
    toggleSidebar,
    setSidebarView
  }
}
