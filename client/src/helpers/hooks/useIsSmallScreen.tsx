import { useState, useEffect } from "react";
import { Breakpoints } from "../screen";

/**
 * Detect if the screen is small
 */
export function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth < Breakpoints.xsmall
  );

  const checkIsMobile = () => {
    setIsSmallScreen(window.innerWidth < Breakpoints.xsmall);
  };

  useEffect(() => {
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isSmallScreen;
}
