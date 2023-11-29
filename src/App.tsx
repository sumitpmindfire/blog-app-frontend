import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "pages/auth/Signup";
import Login from "pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
