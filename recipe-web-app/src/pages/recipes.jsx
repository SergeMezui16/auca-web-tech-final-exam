import { RecipeCard } from "@/components/molecule/index.js";
import { useFetchQuery } from "@/hooks/use-queries.js";

export default function RecipePage() {
  const {isPending, data} = useFetchQuery("/recipes");

  if (isPending) return <div>Loading...</div>;

  return <div className="container mx-auto ">
    <div
      className="grid grid-cols-1 items-center justify-center mx-auto  gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {data.map(recipe => <RecipeCard recipe={recipe} key={recipe.id}/>)}
    </div>
  </div>;
}