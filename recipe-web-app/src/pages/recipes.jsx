import { RecipeCard } from "@/components/molecule/index.js";
import { useInfiniteFetchQuery } from "@/hooks/use-queries.js";
import { LoadingBlock } from "@/components/molecule/loading-block.jsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem
} from "@/components/ui/pagination";
import { Fragment, useState } from "react";
import { Button } from "@/components/ui/index.js";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function RecipePage() {
  const [filter, setFilter] = useState({
    size: 6,
    page: 0,
    published: true
  });

  const {
    data,
    isLoading,
    hasNextPage,
    hasPreviousPage
  } = useInfiniteFetchQuery("/recipes/p", {}, filter);

  if (isLoading) return <LoadingBlock/>;

  return <div className="container mx-auto">
    <div
      className="grid grid-cols-1 items-center justify-center mx-auto  gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.content.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id}/>)}
        </Fragment>))
      }
    </div>
    <div className="my-10">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Previous disabled={!hasPreviousPage} onClick={() => setFilter({...filter, page: filter.page - 1})}/>
          </PaginationItem>
          <PaginationItem>
            <Button variant="outline">{filter.page + 1}</Button>
          </PaginationItem>
          <PaginationItem>
            <Next disabled={!hasNextPage} onClick={() => setFilter({...filter, page: filter.page + 1})}/>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>

  </div>;
}

const Next = (props) => {
  return (<Button variant="ghost" {...props}>
    Next
    <ChevronRightIcon className="h-4 w-4"/>
  </Button>);
};

const Previous = (props) => {
  return (<Button variant="ghost" {...props}>
    <ChevronLeftIcon className="h-4 w-4"/>
    Previous
  </Button>);
};