import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  GalleriesByCategory,
  GalleriesByTag,
  GalleryDetailComp,
  Error,
  Home,
} from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "page/:page",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: ":page",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "tag/:tag/page/:page",
        element: <GalleriesByTag />,
        errorElement: <Error />,
      },
      {
        path: "category/:category/page/:page",
        element: <GalleriesByCategory />,
        errorElement: <Error />,
      },
      {
        // path: ":category/:page/detail",
        path: "detail",
        element: <GalleryDetailComp />,
        errorElement: <Error />,
      },
      {
        path: "error",
        element: <Error />,
      },
    ],
  },
]);
