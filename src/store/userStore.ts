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















// import { UserState } from "@/types/types";
// import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";

// type StoreType = {
//   user: UserState;
//   saveUser: (user: UserState) => void;
//   logoutUser: () => void;
// };

// const userStore = (set: (fn: (state: StoreType) => Partial<StoreType>) => void): StoreType => ({
//   user: {} as UserState,
//   saveUser: (userr: UserState) => {
//     set(() => ({
//       user: userr,
//     }));
//   },
//   logoutUser: () => {
//     set(() => ({
//       user: {} as UserState,
//     }));
//   },
// });

// const useUserStore = create<StoreType>()(
//   devtools(
//     persist(userStore, {
//       name: "user-store",
//     })
//   )
// );

// export default useUserStore;

// const useUserStore = create(userStore)
// hum esse bhi bana skate hen lekin kyun ke humen local storage ke sath use karna tha or devtools bhi tou humen is tarah banana pare ga

// const useUserStore = create<StoreType>(
//   devtools(
//     persist(userStore, {
//       name: "user-store",
//     })
//   )
// );

// export default useUserStore;

// hum direct ese bhi karsakte hen. matlab hum ne is men
// interface BearState {
//   bears: number
//   increase: (by: number) => void
// }

// const useBearStore = create<BearState>()(
//   devtools(
//     persist(
//       (set) => ({
//         bears: 0,
//         increase: (by) => set((state) => ({ bears: state.bears + by })),
//       }),
//       {
//         name: 'bear-storage',
//       },
//     ),
//   ),
// )
