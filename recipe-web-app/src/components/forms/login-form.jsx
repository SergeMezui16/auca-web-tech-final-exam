import { Button } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InputText } from "@/components/atom/input.jsx";
import { extractServerErrors, useMutation } from "@/hooks/use-queries.js";
import { useNavigate, Link } from "react-router";
import { useAuth } from "@/hooks/use-auth.js";

export function LoginForm() {
  const navigate = useNavigate();
  const {reset} = useAuth();
  const {register, setError, formState: {errors}, handleSubmit} = useForm();
  const {mutate, isPending} = useMutation("/auth/login", {}, "post", ["/auth/me"]);

  const handleLogin = (values) => {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        reset();
        navigate("/");
        toast.success("You have been logged in.");
      },
      onError: (error) => extractServerErrors(setError, error)
    });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleLogin)} className="grid gap-4">
          <InputText
            disabled={isPending}
            required
            error={errors.email?.message}
            label="Email"
            {...register("email")}
            defaultValue={"serge@uii.com"}
          />
          <InputText
            disabled={isPending}
            required
            error={errors.password?.message}
            label="Password"
            type="password"
            {...register("password")}
            defaultValue={"Pass56i?"}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </form>
        <Link to="#" className="block my-2 text-sm text-center w-full underline">
          Forgot your password?
        </Link>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
