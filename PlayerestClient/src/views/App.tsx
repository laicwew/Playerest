import { Outlet } from "react-router-dom";
import { AppNavBar } from "./components/AppNavBar";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);

  const handleChange = () => {
    setIsDark((prev) => !prev);
  };

  return (
    /** TODO: light and dark theme */
    <div
      className={`container-fluid ${isDark ? "dark" : "light"}-theme`}
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <AppNavBar />
      <i
        onClick={handleChange}
        className={`fa fa-toggle-${isDark ? "on" : "off"}`}
        style={{ fontSize: "2rem" }}
      ></i>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default App;
