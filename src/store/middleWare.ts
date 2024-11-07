import { Middleware } from '@reduxjs/toolkit';
import { setUser } from "@/store/lib/slices/userSlice";

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === setUser.type) {
    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(action.payload));
  }
  return next(action);
};

export default localStorageMiddleware;
