import { SidebarView } from "./types";

const SIDEBAR_RESIZE_WINDOW_WIDTH = 1170;

export const shouldSwitchMobileModeOn = (view: SidebarView): boolean => {
  return (window.innerWidth < SIDEBAR_RESIZE_WINDOW_WIDTH && view !== "curtain");
}

export const shouldSwitchMobileModeOff = (view: SidebarView): boolean => {
  return (window.innerWidth >= SIDEBAR_RESIZE_WINDOW_WIDTH && view !== "fixed");
}
