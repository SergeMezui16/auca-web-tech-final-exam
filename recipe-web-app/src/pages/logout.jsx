import { useNavigate } from "react-router";
import { useMutation } from "@/hooks/use-queries.js";
import { useAuth } from "@/hooks/use-auth.js";
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/index.js";
import { toast } from "sonner";
import { LogOutIcon } from "lucide-react";

export function Logout() {
  const navigate = useNavigate();
  const {mutate, isPending} = useMutation("/auth/logout", {}, "POST", ["/auth/me"]);
  const {logout} = useAuth();

  return <Dialog open={true} onOpenChange={() => navigate(-1)}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Logout</DialogTitle>
        <DialogDescription>
          Do you really want to logout ?
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 text-center">
        <LogOutIcon className="w-16 h-16 mx-auto stroke-1"/>
        <p>Do you really want to logout ?</p>
      </div>
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
    </DialogContent>
  </Dialog>;
}