import { Link, NavLink, Outlet } from "react-router";
import { useAccount } from "@/hooks/use-account.js";
import { Book, LayoutDashboard, Settings, ShieldBanIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/index.js";

export const AdminLayout = () => {
  const {isAdmin} = useAccount();

  if (!isAdmin) {
    return <div className="h-screen w-full flex justify-center items-center flex-col gap-4">
      <ShieldBanIcon className="h-12 w-12 text-destructive"/>
      <p>You're not authorized to view this page.</p>
      <Link to="/"><Button variant="link">Go back</Button></Link>
    </div>;
  }

  return (<div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">RecipeHub Admin</h1>
      </div>
      <nav className="mt-4">
        <NavLink to="/admin/" className="flex items-center px-4 py-2 text-gray-700">
          <LayoutDashboard className="w-5 h-5 mr-2"/>
          Dashboard
        </NavLink>
        <NavLink to="/admin/recipes" className="flex items-center px-4 py-2 text-gray-700">
          <Book className="w-5 h-5 mr-2"/>
          Recipes
        </NavLink>
        <NavLink to="/admin/users" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
          <Users className="w-5 h-5 mr-2"/>
          Users
        </NavLink>
        <NavLink to="/admin/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
          <Settings className="w-5 h-5 mr-2"/>
          Settings
        </NavLink>
      </nav>
    </aside>

    {/* Main content */}
    <main className="flex-1 p-8">
      <Outlet/>
    </main>
  </div>);
};