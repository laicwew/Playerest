import "../App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import { Login } from "./login";
import { Search } from "./search";
import { Create } from "./create";
import { Details } from "./details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/create",
    element:<Create />,
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

function StartPage() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/create">Create</Link>
        </li>
      </ul>
    </div>
  );
}
export default App;
