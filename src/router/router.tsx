import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Galleries, GalleryDetailComp, Error } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <>
            <h1>Please select your category</h1>
          </>
        ),
      },
      {
        path: ":category/:page",
        element: <Galleries />,
        errorElement: <Error />,
      },
      {
        path: ":category/:page/detail",
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
