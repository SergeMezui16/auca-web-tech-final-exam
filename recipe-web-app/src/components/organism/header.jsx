import React from 'react';
import { cn } from '@/lib/cn';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui';

const Header = () => {
  const userIsLoggedIn = true; // This should ideally be managed with your state management or context
  const userName = "John Doe"; // Example user name

  return (
    <header className={cn("w-full", "bg-white", "shadow-md", "px-4", "py-2", "flex", "items-center", "justify-between")}>
      <div className="flex items-center space-x-4">
        <h1 className={cn("text-2xl", "font-bold", "text-blue-600")}>Recipe Blog</h1>
        <nav className={cn("hidden", "md:flex", "space-x-4")}>
          <a href="/" className={cn("text-gray-700", "hover:text-blue-600")}>Home</a>
          <a href="/recipes" className={cn("text-gray-700", "hover:text-blue-600")}>Recipes</a>
          <a href="/about" className={cn("text-gray-700", "hover:text-blue-600")}>About</a>
          <a href="/contact" className={cn("text-gray-700", "hover:text-blue-600")}>Contact</a>
        </nav>
      </div>
      <div>
        {userIsLoggedIn ? (
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn("text-gray-700", "hover:text-blue-600")}>{userName}</button>
            </PopoverTrigger>
            <PopoverContent className={cn("bg-white", "shadow-lg", "rounded-lg", "p-4")}>
              <p className={cn("text-sm", "text-gray-500")}>Logged in as {userName}</p>
              <button className={cn("mt-2", "text-red-600", "hover:underline")}>Logout</button>
            </PopoverContent>
          </Popover>
        ) : (
          <a href="/login" className={cn("text-blue-600", "hover:underline")}>Login</a>
        )}
      </div>
    </header>
  );
};

export default Header;