import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  accessToken: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userName: null,
  accessToken: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);;
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const username = localStorage.getItem("userName");
    if (token) {
      setIsAuthenticated(true);
      setAccessToken(token);
      setUserName(username);
    }
  }, []);

  // Function to handle login and save token
  const login = (token: string, username: string) => {
    setIsAuthenticated(true);
    setAccessToken(token);
    setUserName(username);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userName", username);
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
    <AuthContext.Provider value={{ isAuthenticated, userName, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
