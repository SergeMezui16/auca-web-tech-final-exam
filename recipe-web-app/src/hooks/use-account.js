import { useAuth } from "@/hooks/use-auth.js";
import { UnauthorizedError } from "@/errors/unauthorized-error.js";

export const useAccount = () => {
  const {account} = useAuth();

  if (!account) throw UnauthorizedError();

  return account;

};