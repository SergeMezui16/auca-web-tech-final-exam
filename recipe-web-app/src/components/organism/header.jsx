import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router";
import { useAccount } from "@/hooks/use-account.js";

function UserNav() {
  const account = useAccount();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@johndoe"/>
            <AvatarFallback>{account.name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{account.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {account.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4"/>
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4"/>
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <Link to="/logout">
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4"/>
            <span>Log out</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">RecipeHub</span>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/recipes" className="text-gray-600 hover:text-gray-900">Recipes</Link>
              <Link to="/new" className="text-gray-600 hover:text-gray-900">Add Recipe</Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex gap-5">
            <div className="hidden md:block flex-1 max-w-sm mx-4">
              <form className="relative">
                <Input
                  type="search"
                  placeholder="Search recipes..."
                  className="w-full pl-10"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
              </form>
            </div>
            <div className="hidden md:flex items-center">
              <UserNav/>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6"/>
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="-mt-3 ">
                  <UserNav/>
                </div>
                <nav className="flex flex-col space-y-4 mt-4">
                  <Link to="/recipes" className="text-gray-600 hover:text-gray-900">Recipes</Link>
                </nav>
                <div className="mt-4">
                  <Input
                    type="search"
                    placeholder="Search recipes..."
                    className="w-full"
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

