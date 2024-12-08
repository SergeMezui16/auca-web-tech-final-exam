import { createBrowserRouter } from "react-router";
import { RegisterPage } from "@/pages/register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterPage/>
  }
]);