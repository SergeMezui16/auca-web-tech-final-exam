import { useAccountStore } from "@/store";
import { useCallback } from "react";

export const AuthStatus = {
  Unknown: 0,
  Authenticated: 1,
  Guest: 2
};

export const useAuth = () => {
  const {account, setAccount} = useAccountStore();
  let status;

  switch (account) {
    case null:
      status = AuthStatus.Guest;
      break;
    case undefined:
      status = AuthStatus.Unknown;
      break;
    default:
      status = AuthStatus.Authenticated;
      break;
  }

  const login = useCallback((data) => {
    setAccount(data);
  }, []);

  const logout = useCallback(() => {
    setAccount(null);
  }, []);

  return {
    account,
    status,
    login,
    logout,
    reset: () => setAccount(undefined)
  };
};