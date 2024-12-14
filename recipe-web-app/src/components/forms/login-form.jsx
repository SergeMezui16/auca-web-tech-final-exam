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
import { InputNumber, InputText } from "@/components/atom/input.jsx";
import { extractServerErrors, useMutation } from "@/hooks/use-queries.js";
import { useNavigate, Link } from "react-router";
import { useAuth } from "@/hooks/use-auth.js";
import { useState } from "react";


export function LoginForm() {
  const navigate = useNavigate();
  const [mfa, setMfa] = useState(false);
  const [credentials, setCredentials] = useState({});
  const {login} = useAuth();
  const {register, setError, formState: {errors}, handleSubmit} = useForm();
  const mfaForm = useForm();
  const {mutate, isPending} = useMutation("/auth/login", {}, "post", ["/auth/me"]);
  const mfaQuery = useMutation("/auth/mfa", {}, "post", ["/auth/me"]);

  const handleLogin = (values) => {
    mutate(values, {
      onSuccess: (r) => {
        login(r).then((v) => {
          if(v === "MFA") {
            setMfa(true);
            setCredentials(values);
          } else {
            navigate("/");
            toast.success("You have been logged in.");
          }
        })
      },
      onError: (error) => extractServerErrors(setError, error)
    });
  };

  const handleOTP = (values) => {
    mfaQuery.mutate(
      {
        ...credentials,
        code: values.code
      },
      {
        onSuccess: (r) => {
          login(r).then((v) => {
            navigate("/");
            toast.success("You have been logged in.");
          })
        },
        onError: (error) => extractServerErrors(mfaForm.setError, error)
      }
    )
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!mfa && <>
          <form onSubmit={handleSubmit(handleLogin)} className="grid gap-4">
            <InputText
              disabled={isPending}
              required
              error={errors.email?.message}
              type="email"
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
          </form>
        </>}
        {mfa && <form onSubmit={mfaForm.handleSubmit(handleOTP)} className="grid gap-4">
          <InputNumber
            disabled={isPending}
            required
            error={mfaForm.formState.errors?.code?.message}
            label="Code OTP"
            type="number"
            {...mfaForm.register("code")}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>}
        <Link to="/request_reset_password" className="block my-2 text-sm text-center w-full underline">
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
