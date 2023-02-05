import { useState } from "react";

export const useSidebar = () => {
  const [open, setOpen] = useState<boolean>((window.innerWidth > 1170));

  const toggleSidebar = (): void => {
    setOpen(!open);
  }

  return {
    open,
    toggleSidebar,
  }
}
