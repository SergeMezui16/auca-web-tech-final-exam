import { Navigate, Outlet } from "react-router";
import { AuthStatus, useAuth } from "@/hooks/use-auth.js";
import { useFetchQuery } from "@/hooks/use-queries.js";
import { useEffect } from "react";
import { LoadingBlock } from "@/components/molecule/loading-block.jsx";

export const AppLayout = () => {
  const {status, isPending} = useLogin()

  if (status === AuthStatus.Unknown || isPending) {
    if (isPending) return <LoadingBlock />;
  }

  if (status === AuthStatus.Guest) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};



const useLogin = () => {
  const {login, status} = useAuth();
  const {data, isPending} = useFetchQuery("/auth/me");

  useEffect(() => {
    if (data) login(data);
  }, [data]);

  return {status, isPending};
};