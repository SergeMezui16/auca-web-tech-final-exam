import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui";

export const NewRecipePage = () => {
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm();

  const handleCreate = (values) => {
    console.log(values);
  }

  return (<Dialog open={true} onOpenChange={() => {
    navigate(-1);
  }}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Create a new recipe</DialogTitle>
        <DialogDescription>
          Fill this form to create a new recipe.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleCreate)} className="flex flex-col gap-4">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="name">Name*</Label>
          <Input required id="name" {...register("name")}/>
        </div>
        <div className="grid flex-1 gap-2">
          <Label htmlFor="duration">Duration*</Label>
          <Input required type="number" id="duration" {...register("duration", {valueAsNumber: true})}/>
        </div>
        <div className="grid flex-1 gap-2">
          <Label htmlFor="description">Description*</Label>
          <Textarea required id="description" {...register("description")}/>
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