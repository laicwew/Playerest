import { AppNavBar } from "../search/components/AppNavBar";
import CreateFrom from "./components/CreateFrom";
import UploadImage from "./components/UploadImage";

export function Create() {
  return (
    <>
      <div
        className="container-fluid"
        style={{
          height: "100vh", // Full height of the viewport
          width: "100vw", // Full width of the viewport
        }}
      >
        <AppNavBar />
        <UploadImage />
        <CreateFrom />
      </div>
    </>
  );
}
