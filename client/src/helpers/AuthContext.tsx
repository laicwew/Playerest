import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  accessToken: string | null;
  savedReviewsIds: number[];
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userName: null,
  accessToken: null,
  savedReviewsIds: [],
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [savedReviewsIds, setSavedReviewsIds] = useState<number[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const username = localStorage.getItem("userName");
    const lastLoginTime = localStorage.getItem("lastLoginTime");

    if (token && lastLoginTime) {
      const timeElapsed = Date.now() - parseInt(lastLoginTime);
      // Check if 1 hour (3600000 ms) has passed since last login
      if (timeElapsed < 3600000) {
        setIsAuthenticated(true);
        setAccessToken(token);
        setUserName(username);
      }
    } else {
      logout();
    }

    if (token) {
      setIsAuthenticated(true);
      setAccessToken(token);
      setUserName(username);
    }
  }, []);

  useEffect(() => {
    const savedReviewsIdsString = localStorage.getItem("savedReviewsIds");
    if (accessToken) {
      // Parse savedReviewsIds from localStorage if present, or default to empty array
      if (savedReviewsIdsString) {
        try {
          const parsedIds = JSON.parse(savedReviewsIdsString);
          if (
            Array.isArray(parsedIds) &&
            JSON.stringify(parsedIds) !== JSON.stringify(savedReviewsIds)
          ) {
            setSavedReviewsIds(parsedIds);
          }
        } catch (error) {
          console.error(
            "Error parsing savedReviewsIds from localStorage",
            error
          );
        }
      }
    }
  }, [accessToken, savedReviewsIds]);

  // Effect to periodically check if the token is expired
  useEffect(() => {
    const interval = setInterval(() => {
      const lastLoginTime = localStorage.getItem("lastLoginTime");

      if (lastLoginTime) {
        const timeElapsed = Date.now() - parseInt(lastLoginTime);

        // Logout if more than 1 hour has passed
        if (timeElapsed >= 3600000) {
          logout();
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Function to handle login and save token
  const login = (token: string, username: string) => {
    const currentTime = Date.now().toString();
    setIsAuthenticated(true);
    setAccessToken(token);
    setUserName(username);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userName", username);
    localStorage.setItem("lastLoginTime", currentTime);
  };

  // Function to handle logout
  const logout = () => {
    setIsAuthenticated(false);
    setUserName(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userName,
        accessToken,
        savedReviewsIds,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
