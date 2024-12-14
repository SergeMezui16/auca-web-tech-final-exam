import { Button } from "@/components/ui";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-primary text-3xl font-bold">
        Welcome to RecipeHub!
      </h1>
      <p className="text-lg mb-8">
        Discover, create, and share delicious recipes from around the world.
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