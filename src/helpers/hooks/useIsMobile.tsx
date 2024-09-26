import { useState, useEffect } from "react";
import { Breakpoints } from "../screen";

/**
 * Detect if the screen is small or not (mobile)
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < Breakpoints.small
  );
  // Function to update the state when the window is resized
  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < Breakpoints.small);
  };

  useEffect(() => {
    window.addEventListener("resize", checkIsMobile);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}
