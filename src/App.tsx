import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutPage, Home, DndPage } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "dnd",
      element: <DndPage />,
    },
    {
      path: "layout",
      element: <LayoutPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
