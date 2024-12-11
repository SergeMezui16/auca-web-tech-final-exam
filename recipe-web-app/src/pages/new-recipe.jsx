import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { extractServerErrors, useMutation } from "@/hooks/use-queries";
import { InputNumber, InputText, InputTextarea } from "@/components/atom/input";

export const NewRecipePage = () => {
  const navigate = useNavigate();
  const {register, setError, formState: {errors}, handleSubmit} = useForm();
  const {mutate, isPending} = useMutation("/recipes", {}, "post", ['/recipes']);

  const handleCreate = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        navigate(`/recipes/${data.id}/edit`);
      },
      onError: (error) => extractServerErrors(setError, error),
    });
  };

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
      <form onSubmit={handleSubmit(handleCreate)} className="flex flex-col gap-2">
        <InputText
          disabled={isPending}
          required
          error={errors.name?.message}
          label="Nom"
          {...register("name")}
        />
        <InputNumber
          disabled={isPending}
          error={errors.duration?.message}
          label="Duration"
          {...register("duration", {valueAsNumber: true})}
          required
          description="Baking duration in minutes."
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