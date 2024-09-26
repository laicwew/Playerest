import { useState, useEffect } from "react";
import { Breakpoints } from "../screen";

/**
 * Detect if the screen is small or not (mobile)
 */
export function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth < Breakpoints.xsmall
  );
  // Function to update the state when the window is resized
  const checkIsMobile = () => {
    setIsSmallScreen(window.innerWidth < Breakpoints.xsmall);
  };

  useEffect(() => {
    window.addEventListener("resize", checkIsMobile);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isSmallScreen;
}
