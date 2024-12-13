import { MailCheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useState } from "react";
import { InputText } from "@/components/atom/input.jsx";
import { useForm } from "react-hook-form";
import { extractServerErrors, useMutation } from "@/hooks/use-queries.js";
import { getAbsoluteUrl } from "@/functions.js";
import { toast } from "sonner";

export const ResetPasswordRequest = () => {
  const [sent, setSent] = useState(false);
  const {register, setError, formState: {errors}, handleSubmit} = useForm();
  const {mutate, isPending} = useMutation("/reset_password_request", {}, "post");

  const handleSend = (values) => {
    mutate({...values, link: getAbsoluteUrl("/reset_password")}, {
      onSuccess: () => {
        setSent(true);
        toast.success("Check you mail!");
      },
      onError: (error) => extractServerErrors(setError, error)
    });
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reset your password</DialogTitle>
          <DialogDescription>
            Send your password request.
          </DialogDescription>
        </DialogHeader>
        {!sent ? <form onSubmit={handleSubmit(handleSend)} className="flex flex-col gap-4">
            <InputText
              disabled={isPending}
              required
              error={errors.email?.message}
              type="email"
              label="Email"
              {...register("email")}
            />
            <Button type="submit" className="w-full">
              Send
            </Button>
          </form> :
          <div className="space-y-4 text-center">
            <MailCheckIcon className="w-16 h-16 mx-auto stroke-1"/>
            <p>Email sent, check you email and use the reset link !</p>
          </div>}
      </DialogContent>
    </Dialog>);
};