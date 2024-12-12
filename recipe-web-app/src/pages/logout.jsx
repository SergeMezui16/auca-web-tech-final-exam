import { useNavigate } from "react-router";
import { useMutation } from "@/hooks/use-queries.js";
import { useAuth } from "@/hooks/use-auth.js";
import { Button } from "@/components/ui/index.js";
import { toast } from "sonner";

export function Logout() {
  const navigate = useNavigate();
  const {mutate, isPending} = useMutation("/auth/logout", {}, "POST", ["/auth/me"]);
  const {logout} = useAuth();

  return <div className="flex flex-col h-screen gap-4 justify-center items-center">
    <Button onClick={() => {
      logout();
      mutate(1, {
        onSuccess: () => {
          logout();
          toast.success("Logged out");
          navigate("/login");
        }
      });
    }} disabled={isPending}>{isPending ? "Logging out" : "Logout"}</Button>
  </div>;
}