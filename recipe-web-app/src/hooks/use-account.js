import { useAuth } from "@/hooks/use-auth.js";
import { UnauthorizedError } from "@/errors/unauthorized-error.js";

export const useAccount = () => {
  const {account} = useAuth();

  if (!account) throw new UnauthorizedError();

  return {account, isAdmin: account.role === "ROLE_ADMIN"};
};