import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { InputText } from "@/components/atom/input.jsx";
import { useForm } from "react-hook-form";
import { extractServerErrors, useMutation } from "@/hooks/use-queries.js";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";

export const ResetPassword = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const {register, setError, formState: {errors}, handleSubmit} = useForm();
  const {mutate, isPending} = useMutation("/reset_password", {}, "post");

  const handleSend = (values) => {
    mutate({...values, token: search.get('token')}, {
      onSuccess: () => {
        navigate("/login");
        toast.success("Password saved!");
      },
      onError: (error) => extractServerErrors(setError, error)
    });
  };

  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reset your password</DialogTitle>
          <DialogDescription>
            Enter your new password here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSend)} className="flex flex-col gap-4">
            <InputText
              disabled={isPending}
              required
              error={errors.password?.message}
              type="password"
              label="New Password"
              {...register("password")}
            />
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
      </DialogContent>
    </Dialog>);
};