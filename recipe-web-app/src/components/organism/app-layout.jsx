import { Header } from "@/components/organism/header";
import { Footer } from "@/components/organism/footer";
import { Outlet } from "react-router";

export const AppLayout = () => {
  return <div className="flex flex-col gap-4">
    <Header/>
    <div className="min-h-screen"><Outlet/></div>
    <Footer/>
  </div>;
};