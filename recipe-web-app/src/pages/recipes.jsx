import { RecipeCard } from "@/components/molecule/index.js";

export default function Recipes() {
  return <div className="container mx-auto ">
    <div className="grid grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5].map(a => <RecipeCard key={a}/>)}
    </div>
  </div>;
}