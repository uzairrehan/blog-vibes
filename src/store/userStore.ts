import {  UserState } from "@/types/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type StoreType = {
  user: UserState;
  saveUser: (user: UserState) => void;
  logoutUser: () => void;
};

const useUserStore = create<StoreType>()(
  devtools(
    persist(
      (set) => ({
        user: {} as UserState,
        saveUser: (user) => set({ user }),
        logoutUser: () => set({ user: {} as UserState }),
      }),
      {
        name: "user-store",
      }
    )
  )
);

export default useUserStore;