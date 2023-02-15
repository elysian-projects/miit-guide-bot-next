import { useEffect } from "react";

export const useWindowResizeHandler = (resizeHandler: () => void) => {
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [resizeHandler])
}
