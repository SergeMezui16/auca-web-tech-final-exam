import { Fragment, useState } from "react";
import {
  Button, Input
} from "@/components/ui/index.js";
import { ArrowDownAZIcon, ArrowDownZAIcon, Search, Trash2Icon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { useInfiniteFetchQuery } from "@/hooks/use-queries.js";
import { useForm } from "react-hook-form";
import { LoadingBlock } from "@/components/molecule/loading-block.jsx";

export const UserList = () => {
  const {register, handleSubmit} = useForm()
  const [filter, setFilter] = useState({
    sortBy: "id",
    size: 5,
    page: 0,
    asc: true,
    name: ""
  });

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteFetchQuery("/users/paginate", {}, filter);

  if (isLoading) return <LoadingBlock />;

  const handleSort = (data) => {
    setFilter({
      ...filter,
      sortBy: data,
      asc: filter.sortBy === data ? !filter.asc : true
    });
  };

  const handleSearch = (values) => {
    console.log(values);
    setFilter({...filter, name: values.name})
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Users</h2>
      </div>
      <form className="flex gap-4 my-4" onSubmit={handleSubmit(handleSearch)}>
        <Input
          type="text"
          placeholder="Search by name..."
          className=""
          autoFocus
          {...register("name")}
        />
        <Button type="submit"><Search className="w-6 h-6"/></Button>
      </form>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableSortHeader
                label="ID" value="id" filter={filter}
                onSort={handleSort}/>
              <TableSortHeader
                label="Name" value="name" filter={filter}
                onSort={handleSort}/>
              <TableSortHeader
                label="Email" value="email" filter={filter}
                onSort={handleSort}/>
              <TableSortHeader
                label="Bio" value="bio" filter={filter}
                onSort={handleSort}/>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.pages.map((group, i) => (
              <Fragment key={i}>
                {group.content.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.bio}</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="icon"><Trash2Icon className="w-6 h-6"/></Button>
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

const TableSortHeader = ({filter, value, label, onSort}) => {
  return <TableHead className="cursor-pointer hover:text-accent-foreground/90">
    <div className="flex flex-col gap-1 my-2">
      <div
        onClick={() => onSort(value)}
        className="flex gap-4 justify-between items-center">
        {label} {filter.sortBy === value && (filter.asc ? <ArrowDownAZIcon className="w-4 h-4"/> :
        <ArrowDownZAIcon className="w-4 h-4"/>)}
      </div>
    </div>
  </TableHead>;
};