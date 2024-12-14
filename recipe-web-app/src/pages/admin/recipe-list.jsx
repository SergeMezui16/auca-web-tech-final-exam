import { Fragment, useState } from "react";
import {
  Button,
  Input
} from "@/components/ui/index.js";
import { ArrowDownAZIcon, ArrowDownZAIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { useInfiniteFetchQuery } from "@/hooks/use-queries.js";

import { useForm } from "react-hook-form";
import { LoadingBlock } from "@/components/molecule/loading-block.jsx";

export const RecipeList = () => {
  const [filter, setFilter] = useState({
    sortBy: "id",
    size: 5,
    page: 0,
    asc: true,
    description: "",
    name: "",
    duration: "",
  });

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteFetchQuery("/recipes/paginate", {}, filter);

  if (isLoading) return <LoadingBlock />;

  const handleSort = (data) => {
    setFilter({
      ...filter,
      sortBy: data,
      asc: filter.sortBy === data ? !filter.asc : true
    });
  };

  const handleSearch = (key, value) => {
    setFilter({
      ...filter,
      description: key === "description" ? value : "",
      name: key === "name" ? value : "",
      duration: key === "duration" ? value : "",
    });
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Recipes</h2>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableSortHeader
                label="Name" value="name" filter={filter}
                onSearch={handleSearch}
                defaultValue={filter.name}
                onSort={handleSort}/>
              <TableSortHeader
                label="Desciption" value="description" filter={filter}
                onSearch={handleSearch}
                defaultValue={filter.description}
                onSort={handleSort}/>
              <TableSortHeader
                label="Duration" value="duration" filter={filter}
                onSearch={handleSearch}
                defaultValue={filter.duration}
                onSort={handleSort}/>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.pages.map((group, i) => (
              <Fragment key={i}>
                {group.content.map((recipe) => (
                  <TableRow key={recipe.id}>
                    <TableCell>{recipe.name}</TableCell>
                    <TableCell>{recipe.description}</TableCell>
                    <TableCell>{recipe.duration}</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="icon"><Trash2Icon className="w-6 h-6" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>))
            }
          </TableBody>
        </Table>
      </div>
      <div className="my-5 w-full">
        {hasNextPage && <Button
          className="w-full"
          variant="outline"
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          Fetch more
        </Button>}
      </div>
    </>);
};

const TableSortHeader = ({filter, value, label, onSort, defaultValue, onSearch}) => {
  const {register, handleSubmit} = useForm();
  return <TableHead className="cursor-pointer hover:text-accent-foreground/90">
    <div className="flex flex-col gap-1 my-2">
      <div
        onClick={() => onSort(value) }
        className="flex gap-4 justify-between items-center">
        {label} {filter.sortBy === value && (filter.asc ? <ArrowDownAZIcon className="w-4 h-4"/> :
        <ArrowDownZAIcon className="w-4 h-4"/>)}
      </div>
      <form
        onSubmit={handleSubmit(values => onSearch(value, values[value]))}
        className="flex gap-1 text-xs">
        <Input defaultValue={defaultValue} {...register(value)} className="px-2 h-6"/>
        <Button type="submit" variant="outline" className="p-0 w-8 h-6 mx-auto">
          <SearchIcon className="w-1 h-1"/>
        </Button>
      </form>
    </div>
  </TableHead>;
};