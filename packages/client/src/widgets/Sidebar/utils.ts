export const isMobileWindow = (): boolean => {
  return window.innerWidth <= 1170;
};

export const getSecondaryElementShowClass = (open: boolean): string => {
  return (open && isMobileWindow()) ? "show" : "";
};

export const getSidebarFrameClass = (open: boolean): string => {
  return (!open && isMobileWindow()) ? "closed" : "";
};
