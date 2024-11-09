// store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// Define the user state type
interface UserState {
  email: string;
  uid: string;
  DOB?: string;
  bio?: string;
  fathername?: string;
  imageURL?: string;
  phonenumber?: string;
  userName?: string;
  role?: string;
  saved?:string[]
}

// Get user from LocalStorage if available
const getUserFromLocalStorage = (): UserState | null => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialState: UserState | null = getUserFromLocalStorage();

// Create a user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const user = action.payload;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    },
    clearUser: () => {
      localStorage.removeItem('user');
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
