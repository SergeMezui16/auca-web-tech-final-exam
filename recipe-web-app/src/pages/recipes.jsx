import { RecipeCard } from "@/components/molecule/index.js";
import { useFetchQuery } from "@/hooks/use-queries.js";
import { LoadingBlock } from "@/components/molecule/loading-block.jsx";

export default function RecipePage() {
  const {isLoading, data} = useFetchQuery("/recipes");

  if (isLoading) return <LoadingBlock />;

  return <div className="container mx-auto ">
    <div
      className="grid grid-cols-1 items-center justify-center mx-auto  gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {data.map(recipe => <RecipeCard recipe={recipe} key={recipe.id}/>)}
    </div>
  </div>;
}