import { Amplify } from "aws-amplify";
import awsmobile from "./aws-exports.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./views/App.tsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Profile } from "./views/profile/index.tsx";
import { Search } from "./views/search";
import { Create } from "./views/create";
import { ReviewDetailPage } from "./views/details";
import { SearchResults } from "./views/search/components/SearchResults.tsx";

Amplify.configure(awsmobile);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Search />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "reviews/detail/:id",
        element: <ReviewDetailPage />,
      },
      {
        path: "/search-results", // Add the route for search results
        element: <SearchResults />, // Link it to the SearchResults component
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  </StrictMode>
);
