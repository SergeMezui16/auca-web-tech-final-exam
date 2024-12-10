import { RecipeCard } from "@/components/molecule/index.js";

export default function RecipePage() {
  return <div className="container mx-auto ">
    <div className="grid grid-cols-1 items-center justify-center mx-auto  gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {[1, 2, 3, 4, 5].map(a => <RecipeCard key={a}/>)}
    </div>
  </div>;
}