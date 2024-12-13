import { Button } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { extractServerErrors, useMutation } from "@/hooks/use-queries.js";
import { InputText, InputTextarea } from "@/components/atom/input.jsx";

export function RegisterForm() {
  const navigate = useNavigate();
  const {register, setError, formState: {errors}, handleSubmit} = useForm();
  const {mutate, isPending} = useMutation("/auth/register", {}, "post", ['/auth/me']);

  const handleLogin = (values) => {
    console.log(values);
    mutate(values, {
      onSuccess: (data) => {
        navigate("/login");
        toast.success("Your account has been created. You can login!")
      },
      onError: (error) => extractServerErrors(setError, error),
    });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your personal information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleLogin)} className="grid gap-2">
          <InputText
            disabled={isPending}
            required
            error={errors.email?.message}
            label="Email"
            {...register("email")}
          />
          <InputText
            disabled={isPending}
            required
            error={errors.name?.message}
            label="Name"
            {...register("name")}
          />
          <InputText
            disabled={isPending}
            required
            type="password"
            error={errors.password?.message}
            label="Password"
            {...register("password")}
          />
          <InputTextarea
            disabled={isPending}
            required
            error={errors.bio?.message}
            label="Bio"
            {...register("bio")}
          />
          <Button disabled={isPending} type="submit" className="w-full">
            Register
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
