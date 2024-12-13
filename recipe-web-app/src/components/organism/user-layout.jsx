import { Header } from "@/components/organism/header.jsx";
import { Outlet } from "react-router";
import { Footer } from "@/components/organism/footer.jsx";

export const UserLayout = () => {
  return (<div className="flex flex-col gap-4">
    <Header/>
    <div className="min-h-screen"><Outlet/></div>
    <Footer/>
  </div>);
}