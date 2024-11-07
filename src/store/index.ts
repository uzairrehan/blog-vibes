import { configureStore } from "@reduxjs/toolkit";
import localStorageMiddleware from "./middleWare";
import userReducer from "@/store/lib/slices/userSlice";



const persistedUser =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;
const initialUser = persistedUser ? JSON.parse(persistedUser) : null;

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: {
      user: initialUser,
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
