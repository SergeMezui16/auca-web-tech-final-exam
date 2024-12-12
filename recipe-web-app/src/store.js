import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export const useAccountStore = create(
  persist(
    combine({
      account: null
    }, (set) => ({
      setAccount: (account) => set({account})
    }))
    , {
      name: "account"
    }
  )
);