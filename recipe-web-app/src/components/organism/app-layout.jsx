import { Header } from "@/components/organism/header";
import { Footer } from "@/components/organism/footer";
import { Navigate, Outlet } from "react-router";
import { AuthStatus, useAuth } from "@/hooks/use-auth.js";
import { useFetchQuery } from "@/hooks/use-queries.js";
import { useEffect } from "react";

export const AppLayout = () => {
  const {status, isPending} = useLogin()

  if (status === AuthStatus.Unknown || isPending) {
    return <div>Loading...</div>;
  }

  if (status === AuthStatus.Guest) {
    return <Navigate to="/login" />;
  }

  return <div className="flex flex-col gap-4">
    <Header/>
    <div className="min-h-screen"><Outlet/></div>
    <Footer/>
  </div>;
};



const useLogin = () => {
  const {login, status} = useAuth();
  const {data, isPending} = useFetchQuery("/auth/me");

  useEffect(() => {
    if (data) login(data);
  }, [data]);

  return {status, isPending};
};