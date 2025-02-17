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
      if (data?.type === "MFA") return new Promise( (resolve, reject) => {
        resolve("MFA");
      })

      return fetch(import.meta.env.VITE_API_URL + "/auth/me", {headers: {"Authorization": "Bearer " + data.token}})
        .then(res => res.json())
        .then(u => setAccount(u))
        .then(() => "/");
    }
    , []);

  const logout = useCallback(() => {
    setAccount(null);
  }, []);

  return {
    account,
    status,
    login,
    logout,
    reset: () => setAccount(undefined),
    register: (data) => setAccount(data)
  };
};