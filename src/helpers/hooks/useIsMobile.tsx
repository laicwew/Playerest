import { useState, useEffect } from "react";
import { Breakpoints } from "../screen";

/**
 * Detect if the screen is mobile
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < Breakpoints.small
  );

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < Breakpoints.small);
  };

  useEffect(() => {
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}
