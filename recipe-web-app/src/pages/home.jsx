import React from "react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <div className={cn("min-h-screen", "flex", "flex-col", "items-center", "justify-center", "bg-gray-100", "p-4")}>
      <h1 className="text-primary text-3xl font-bold">
        Welcome to My Recipe Blog!
      </h1>
      <p className={cn("text-lg", "mb-8", "text-gray-700")}>
        Discover a variety of delicious recipes to try!
      </p>
      <Link to="/recipes">
        <Button variant="default">
          Explore Recipes
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;