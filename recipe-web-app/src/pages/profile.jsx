import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import {
  Button,
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/index.js";
import { EditIcon } from "lucide-react";
import { InputText, InputTextarea } from "@/components/atom/input.jsx";
import { useForm } from "react-hook-form";
import { useAccount } from "@/hooks/use-account.js";
import { useState } from "react";
import { toast } from "sonner";
import { extractServerErrors, useMutation } from "@/hooks/use-queries.js";

export const ProfilePage = () => {
  const {account} = useAccount();
  return <div className="container mx-auto mt-10 flex">
    <div className="flex flex-col gap-4 items-center justify-center flex-1">
      <Avatar className="w-32 h-32">
        <AvatarImage src={account.name} alt={account.name}/>
        <AvatarFallback>{account.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2 text-center">
        <div className="">{account.email}</div>
        <div className="">{account.name}</div>
        <div className="">{account.bio}</div>
      </div>
      <div className="space-x-4">
        <UpdateProfile/>
      </div>
    </div>
  </div>;
};

const UpdateProfile = () => {
  const [open, setOpen] = useState(false);
  const {register, setError, formState: {errors}, handleSubmit} = useForm();
  const {account} = useAccount();
  const {mutate, isPending} = useMutation("/account", {}, "put");

  const handleEdit = (values) => {
    mutate(values, {
      onSuccess: () => {
        window.location.reload();
        toast.success("Profile updated !");
        setOpen(false);
      },
      onError: (error) => extractServerErrors(setError, error),
    })
    console.log(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <EditIcon className="w-4 h-4 mr-2"/>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update profile</DialogTitle>
          <DialogDescription>
            Update your profile here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEdit)} className="grid gap-2">
          <InputText
            disabled={isPending}
            required
            error={errors.name?.message}
            label="Name"
            {...register("name")}
            defaultValue={account.name}
          />
          <InputTextarea
            disabled={isPending}
            required
            error={errors.bio?.message}
            label="Bio"
            {...register("bio")}
            defaultValue={account.bio}
          />
          <Button disabled={isPending} type="submit" className="w-full">
            Save
          </Button>
        </form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button className="w-full" type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
};