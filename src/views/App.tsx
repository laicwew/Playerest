import "../App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./login";
import { Search } from "./search";
import { Create } from "./create";
import { Details } from "./details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/details:id",
    element: <Details />,
  },
]);

function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<p>Loading...</p>}
    ></RouterProvider>
  );
}
export default App;
