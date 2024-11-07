import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  DOB?: string;
  bio?: string;
  email: string;
  fathername?: string;
  imageURL?: string;
  phonenumber?: string;
  uid: string;
  userName: string;
  role?: string;
};

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;