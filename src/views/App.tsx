import { Outlet } from "react-router-dom";
import { AppNavBar } from "./components/AppNavBar";

function App() {
  return (
    /** TODO: light and dark theme */
    <div
      className="container-fluid light-theme"
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <AppNavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default App;
