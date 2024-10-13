import { Outlet } from "react-router-dom";
import { AppNavBar } from "./components/AppNavBar";
import { useState, useEffect } from "react";

function App() {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark" ? true : false;
  });

  const changeTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDark(storedTheme === "dark");
    }
  }, []);

  return (
    <div
      className={`container-fluid ${isDark ? "dark" : "light"}-theme`}
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: isDark ? "#1B1039FF" : "#fcfafa",
      }}
    >
      <AppNavBar isDarkTheme={isDark} changeTheme={changeTheme} />
      <main
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
export default App;
