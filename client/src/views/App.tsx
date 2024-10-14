import { Outlet } from "react-router-dom";
import { AppNavBar } from "./components/AppNavBar";
import { useEffect, useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const changeTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  useEffect(() => {
    document.body.className = isDark ? "dark-theme" : "light-theme";
  }, [isDark]);

  return (
    <div
      className={`container-fluid ${isDark ? "dark" : "light"}-theme`}
      style={{
        height: "100vh",
        width: "100vw",
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
