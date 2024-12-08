import { Button, Textarea } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui";
import { Input } from "@/components/ui";
import { Label } from "@/components/ui";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function RegisterForm() {
  const {register, handleSubmit, formState: {isSubmitting}} = useForm();

  const handleLogin = (values) => {
    console.log(values);
    fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(() => toast.success("Your account has been created."));
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
        <form onSubmit={handleSubmit(handleLogin)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="test@test.com" required {...register("email")}/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input placeholder="Testimony" required {...register("name")}/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Bio</Label>
            <Textarea placeholder="test@test.com" required {...register("bio")}/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" required {...register("password")}/>
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-full">
            Register
          </Button>
          <Button variant="outline" className="w-full">
            Register with Google
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
