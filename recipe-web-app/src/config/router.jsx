import { createBrowserRouter } from "react-router";
import { RegisterPage } from "@/pages/register";
import { LoginPage } from "@/pages/login.jsx";
import HomePage from "@/pages/home.jsx";
import RecipePage from "@/pages/recipes.jsx";
import RecipeDetail from "@/pages/recipe.jsx";
import { AppLayout } from "@/components/organism/app-layout.jsx";
import { NewRecipePage } from "@/pages/new-recipe.jsx";
import { RecipeEditPage } from "@/pages/recipe-edit.jsx";
import { Logout } from "@/pages/logout.jsx";
import { ErrorPage } from "@/pages/error.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <HomePage/>},
      {path: "new", element: <NewRecipePage/>},
      {
        path: "recipes",
        children: [
          {index: true, element: <RecipePage/>},
          {path: ":id", element: <RecipeDetail/>},
          {path: ":id/edit", element: <RecipeEditPage/>}
        ]
      }
    ]
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/logout",
    element: <Logout/>
  }
]);