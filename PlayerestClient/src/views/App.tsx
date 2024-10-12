import { Outlet } from "react-router-dom";
import { AppNavBar } from "./components/AppNavBar";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);

  const changeTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div
      className={`container-fluid ${isDark ? "dark" : "light"}-theme`}
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <AppNavBar isDarkTheme={isDark} changeTheme={changeTheme}/>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default App;
