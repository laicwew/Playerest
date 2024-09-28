import { Outlet } from "react-router-dom";
import "../App.css";
import { AppNavBar } from "./search/components/AppNavBar";

function App() {
  return (
    <div
      className="container-fluid"
      style={{
        height: "100vh", // Full height of the viewport
        width: "100vw", // Full width of the viewport
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
