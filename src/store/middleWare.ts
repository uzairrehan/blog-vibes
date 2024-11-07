import { Middleware } from '@reduxjs/toolkit';
import { setUser } from "@/store/lib/slices/userSlice";
import { User } from 'firebase/auth';

// Type guard to check if the action is of type SetUserAction
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSetUserAction = (action: any): action is { payload: User; type: "user/setUser" } => {
  return action.type === setUser.type;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const localStorageMiddleware: Middleware = (store) => (next) => (action: unknown) => {
  if (isSetUserAction(action)) {
    localStorage.setItem('user', JSON.stringify(action.payload));
  }
  return next(action);
};

export default localStorageMiddleware;
