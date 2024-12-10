import { ImageIcon, PencilIcon, PictureInPicture, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/index.js";
import { useForm } from "react-hook-form";

export const RecipeEditPage = () => {
  return <div className="container mx-auto">
    <h1 className="text-3xl">Recipe #75</h1>
    <hr className="my-4"/>
    <div className="flex gap-4">
      <EditRecipe/>
      <AddIngredient/>
      <AddStep/>
      <UploadImage/>
    </div>
    <div className="flex gap-10 mt-4">
      <div className="flex-1 ">
        <h1 className="text-2xl">Ingredients</h1>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Viande</TableCell>
                <TableCell>2</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <EditIngredient/>
                  <DeleteIngredient recipeId={2} ingredient={27}/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Poulet</TableCell>
                <TableCell>23</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <EditIngredient/>
                  <DeleteIngredient recipeId={2} ingredient={27}/>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-2xl">Steps</h1>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">1</TableCell>
                <TableCell>Step 1</TableCell>
                <TableCell>Description...</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <EditStep/>
                  <DeleteStep recipeId={6} step={56}/>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  </div>;
};

const AddStep = () => {
  const {register, handleSubmit} = useForm();

  const handleAdd = (values) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add step</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a new step</DialogTitle>
          <DialogDescription>
            Fill this form to add a new step to the recipe.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleAdd)} className="flex flex-col gap-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="title">Title*</Label>
            <Input required id="title" {...register("title")}/>
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="position">Position*</Label>
            <Input required type="number" id="position" {...register("position", {valueAsNumber: true})}/>
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="description">Description*</Label>
            <Textarea defaultValue={"recipe description"} required id="description" {...register("description")}/>
          </div>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
};

const AddIngredient = () => {
  const {register, handleSubmit} = useForm();

  const handleAdd = (values) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add ingredient</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a new ingredient</DialogTitle>
          <DialogDescription>
            Fill this form to add a new ingredient to the recipe.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleAdd)} className="flex flex-col gap-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="name">Name*</Label>
            <Input required id="name" {...register("name")}/>
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="quantity">Quantity*</Label>
            <Input required type="number" id="quantity" {...register("quantity", {valueAsNumber: true})}/>
          </div>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
};

const EditRecipe = () => {
  const {register, handleSubmit} = useForm();

  const handleEdit = (values) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Edit Recipe</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit recipe</DialogTitle>
          <DialogDescription>
            Fill this form to edit the recipe.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEdit)} className="flex flex-col gap-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="name">Name*</Label>
            <Input defaultValue={"recipe name"} required id="name" {...register("name")}/>
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="duration">Duration*</Label>
            <Input defaultValue={34} required type="number"
                   id="duration" {...register("duration", {valueAsNumber: true})}/>
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="description">Description*</Label>
            <Textarea defaultValue={"recipe description"} required id="description" {...register("description")}/>
          </div>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
};

const EditIngredient = () => {
  const {register, handleSubmit} = useForm();

  const handleEdit = (values) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon"><PencilIcon className="w-4 h-4"/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit ingredient</DialogTitle>
          <DialogDescription>
            Fill this form to add a new ingredient to the recipe.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEdit)} className="flex flex-col gap-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="name">Name*</Label>
            <Input required defaultValue="aiuzda dzaiuzd" id="name" {...register("name")}/>
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="quantity">Quantity*</Label>
            <Input required defaultValue={23} type="number"
                   id="quantity" {...register("quantity", {valueAsNumber: true})}/>
          </div>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
};

const DeleteIngredient = ({recipeId, ingredient}) => {

  const handleDelete = () => {
    console.log(recipeId, ingredient);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon"><Trash2Icon className="w-4 h-4"/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete ingredient</DialogTitle>
          <DialogDescription>
            Confirm the deletion of this ingredient.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          Do you really want to delete this ingredient ?
        </div>
        <Button onClick={handleDelete} type="submit" className="w-full">
          Delete
        </Button>
        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>);

};

const DeleteStep = ({recipeId, step}) => {

  const handleDelete = () => {
    console.log(recipeId, step);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon"><Trash2Icon className="w-4 h-4"/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete step</DialogTitle>
          <DialogDescription>
            Confirm the deletion of this step.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          Do you really want to delete this step ?
        </div>
        <Button onClick={handleDelete} type="submit" className="w-full">
          Delete
        </Button>
        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
};

const EditStep = () => {
  const {register, handleSubmit} = useForm();

  const handleAdd = (values) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon"><PencilIcon className="w-4 h-4"/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit a step</DialogTitle>
          <DialogDescription>
            Fill this form to edit a step.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleAdd)} className="flex flex-col gap-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="title">Title*</Label>
            <Input defaultValue="zadazd" required id="title" {...register("title")}/>
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="position">Position*</Label>
            <Input defaultValue={76} required type="number"
                   id="position" {...register("position", {valueAsNumber: true})}/>
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="description">Description*</Label>
            <Textarea defaultValue={"recipe description"} required id="description" {...register("description")}/>
          </div>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
};

const UploadImage = () => {
  const {register, handleSubmit} = useForm();

  const handleUpload = (values) => {

    const form = new FormData();
    form.append("file", values.file[0]);

    console.log(form);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon"><ImageIcon className="w-4 h-4"/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit a step</DialogTitle>
          <DialogDescription>
            Fill this form to edit a step.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleUpload)} className="flex flex-col gap-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="file">Image*</Label>
            <Input type="file" required id="file" {...register("file")}/>
          </div>
          <Button type="submit" className="w-full">
            Upload
          </Button>
        </form>
        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
};