import { ImageIcon, PencilIcon, ScanEyeIcon, Trash2Icon } from "lucide-react";

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
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import { extractServerErrors, useDeleteQuery, useFetchQuery, useMultipart, useMutation } from "@/hooks/use-queries.js";
import { InputFile, InputNumber, InputText, InputTextarea } from "@/components/atom/input.jsx";
import { toast } from "sonner";
import { useState } from "react";

export const RecipeEditPage = () => {
  const {id} = useParams();
  const {data: recipe, isLoading} = useFetchQuery("/recipes/:id", {id});

  if (isLoading) return <div>Loading...</div>;

  return <div className="container mx-auto">
    <h1 className="text-3xl">Recipe #{recipe?.id} : {recipe?.name}</h1>
    <p className="text-muted-foreground ">{recipe?.description}</p>
    <hr className="my-4"/>
    <div className="flex gap-4">
      <EditRecipe recipe={recipe}/>
      <AddIngredient recipeId={recipe?.id}/>
      <AddStep recipeId={recipe?.id}/>
      <UploadImage recipeId={recipe?.id}/>
      <Link to={`/recipes/${recipe.id}`} target="_blank"><Button variant="outline" size="icon"><ScanEyeIcon className="w-4 h-4" /></Button></Link>
    </div>
    <div className="flex gap-10 mt-4">
      <div className="flex-1">
        <h1 className="text-2xl font-bold my-4">Steps</h1>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipe.steps
                ?.sort((a, b) => a.position - b.position)
                .map(step => (<TableRow key={step.id}>
                  <TableCell className="font-medium">{step.position}</TableCell>
                  <TableCell>{step.title}</TableCell>
                  <TableCell>{step.description}</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <EditStep step={step} recipeId={recipe.id}/>
                    <DeleteStep step={step} recipeId={recipe.id}/>
                  </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex-1 ">
        <h1 className="text-2xl font-bold my-4">Ingredients</h1>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipe?.ingredients.map(ingredient =>
                <TableRow key={ingredient.id}>
                  <TableCell className="font-medium">{ingredient.name}</TableCell>
                  <TableCell>{ingredient.quantity}</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <EditIngredient recipeId={recipe.id} ingredient={ingredient}/>
                    <DeleteIngredient recipeId={recipe.id} ingredient={ingredient}/>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  </div>;
};

const AddStep = ({recipeId}) => {
  const [open, setOpen] = useState(false);
  const {register, setError, formState: {errors}, handleSubmit} = useForm();
  const {mutate, isPending} = useMutation("/recipes/:id/steps", {id: recipeId}, "post", ["/recipes/:id"]);

  const handleAdd = (values) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        toast.success(`Step added successfully.`);
      },
      onError: (error) => extractServerErrors(setError, error)
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <InputText
            disabled={isPending}
            required
            error={errors.title?.message}
            label="Title"
            {...register("title")}
          />
          <InputNumber
            disabled={isPending}
            error={errors.position?.message}
            label="Position"
            {...register("position", {valueAsNumber: true})}
            required
          />
          <InputTextarea
            disabled={isPending}
            error={errors.description?.message}
            label="Description"
            {...register("description")}
            required
          />
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

const AddIngredient = ({recipeId}) => {
  const [open, setOpen] = useState(false);
  const {register, setError, formState: {errors}, handleSubmit} = useForm();
  const {mutate, isPending} = useMutation("/recipes/:id/ingredients", {id: recipeId}, "post", ["/recipes/:id"]);

  const handleAdd = (values) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        toast.success(`Ingredient added successfully.`);
      },
      onError: (error) => extractServerErrors(setError, error)
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <InputText
            disabled={isPending}
            required
            error={errors.name?.message}
            label="Name"
            {...register("name")}
          />
          <InputNumber
            disabled={isPending}
            error={errors.quantity?.message}
            label="Quantity"
            {...register("quantity", {valueAsNumber: true})}
            required
          />
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

const EditRecipe = ({recipe}) => {
  const [open, setOpen] = useState(false);
  const {register, setError, formState: {errors}, handleSubmit} = useForm();
  const {mutate, isPending} = useMutation("/recipes/:id", {id: recipe.id}, "put", ["/recipes/:id"]);

  const handleEdit = (values) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        toast.success(`Recipe updated successfully.`);
      },
      onError: (error) => extractServerErrors(setError, error)
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <InputText
            disabled={isPending}
            required
            error={errors.name?.message}
            label="Nom"
            {...register("name")}
            defaultValue={recipe.name}
          />
          <InputNumber
            disabled={isPending}
            error={errors.duration?.message}
            label="Duration"
            {...register("duration", {valueAsNumber: true})}
            required
            description="Baking duration in minutes."
            defaultValue={recipe.duration}
          />
          <InputTextarea
            disabled={isPending}
            error={errors.description?.message}
            label="Description"
            {...register("description")}
            required
            defaultValue={recipe.description}
          />
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

const EditIngredient = ({ingredient, recipeId}) => {
  const [open, setOpen] = useState(false);
  const {register, setError, formState: {errors}, handleSubmit} = useForm();
  const {mutate, isPending} = useMutation("/recipes/:id/ingredients/:ingredient", {
    id: recipeId,
    ingredient: ingredient.id
  }, "put", ["/recipes/:id"]);

  const handleEdit = (values) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        toast.success(`Ingrdient #${ingredient.id} updated successfully.`);
      },
      onError: (error) => extractServerErrors(setError, error)
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <InputText
            disabled={isPending}
            required
            error={errors.name?.message}
            label="Name"
            {...register("name")}
            defaultValue={ingredient.name}
          />
          <InputNumber
            disabled={isPending}
            error={errors.quantity?.message}
            label="Quantity"
            {...register("quantity", {valueAsNumber: true})}
            required
            defaultValue={ingredient.quantity}
          />
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
  const [open, setOpen] = useState(false);
  const {mutate} = useDeleteQuery("/recipes/:id/ingredients/:step", {
    id: recipeId,
    step: ingredient.id
  }, ["/recipes/:id"]);

  const handleDelete = () => {
    mutate({}, {
      onSuccess: () => {
        setOpen(false);
        toast.success(`Ingredient removed successfully.`);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
  const [open, setOpen] = useState(false);
  const {mutate} = useDeleteQuery("/recipes/:id/steps/:step", {id: recipeId, step: step.id}, ["/recipes/:id"]);

  const handleDelete = () => {
    mutate({}, {
      onSuccess: () => {
        setOpen(false);
        toast.success(`Step removed successfully.`);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

const EditStep = ({step, recipeId}) => {
  const [open, setOpen] = useState(false);
  const {register, setError, formState: {errors}, handleSubmit} = useForm();
  const {mutate, isPending} = useMutation("/recipes/:id/steps/:step", {
    id: recipeId,
    step: step.id
  }, "put", ["/recipes/:id"]);

  const handleAdd = (values) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        toast.success(`Step #${step.id} updated successfully.`);
      },
      onError: (error) => extractServerErrors(setError, error)
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon"><PencilIcon className="w-4 h-4"/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit step #{step.id}</DialogTitle>
          <DialogDescription>
            Fill this form to edit a step.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleAdd)} className="flex flex-col gap-4">
          <InputText
            disabled={isPending}
            required
            error={errors.title?.message}
            label="Title"
            {...register("title")}
            defaultValue={step.title}
          />
          <InputNumber
            disabled={isPending}
            error={errors.position?.message}
            label="Position"
            {...register("position", {valueAsNumber: true})}
            required
            defaultValue={step.position}
          />
          <InputTextarea
            disabled={isPending}
            error={errors.description?.message}
            label="Description"
            {...register("description")}
            required
            defaultValue={step.description}
          />
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

const UploadImage = ({recipeId}) => {
  const [open, setOpen] = useState(false);
  const {register, handleSubmit} = useForm();
  const {mutate} = useMultipart("/recipes/:id/upload", {id: recipeId}, ["/recipes/:id"]);

  const handleUpload = (values) => {

    const form = new FormData();
    form.append("file", values.file[0]);

    mutate(form, {
      onSuccess: () => {
        setOpen(false);
        toast.success(`Recipe image uploaded successfully.`);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon"><ImageIcon className="w-4 h-4"/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Upload Image
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleUpload)} className="flex flex-col gap-4">
          <InputFile label="Image" required id="file" {...register("file")} />
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