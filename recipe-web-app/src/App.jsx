import { AuthStatus, useAuth } from "@/hooks/use-auth.js";
import { RouterProvider } from "react-router";
import { router, publicRouter } from "@/config/router.jsx";
import { useFetchQuery, useMutation } from "@/hooks/use-queries.js";
import { useEffect } from "react";
import { LoginPage } from "@/pages/login.jsx";

function App() {
  const {status, isPending, isError} = useLogin()

  if (status === AuthStatus.Unknown || isPending) {
    return <div>Loading...</div>;
  }

  if (status === AuthStatus.Guest) {
    return <LoginPage />;
  }

  return (
    <RouterProvider router={router}/>
  );
}

export default App;


const useLogin = () => {
  const {login, status} = useAuth();
  const {data, isPending, isError} = useFetchQuery("/auth/me");

  useEffect(() => {
    if (data) login(data);
  }, [data]);

  return {status, isPending, isError};
};