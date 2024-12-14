import { useFetchQuery } from "@/hooks/use-queries.js";
import { LoadingBlock } from "@/components/molecule/loading-block.jsx";

export default function AdminPage() {
  const recipes = useFetchQuery("/recipes");
  const users = useFetchQuery("/users");

  if(recipes.isLoading || users.isLoading) return <LoadingBlock />;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      </div>
      <div className="flex gap-6">
        <div
          className="w-[200px] h-[200px] bg-gray-200 shadow-xl rounded-lg flex flex-col gap-4 items-center justify-center">
          <div className="text-6xl">{recipes.data?.length}</div>
          <div className="">Recipes published</div>
        </div>
        <div
          className="w-[200px] h-[200px] bg-gray-200 shadow-xl rounded-lg flex flex-col gap-4 items-center justify-center">
          <div className="text-6xl">{users.data?.length}</div>
          <div className="">Users</div>
        </div>
      </div>
    </>);
}

