import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type authstate = {
  currentUser: User | null;
  isUserLoggedIn: boolean;
  authStateLoading: boolean;
};

const authInitalState: authstate = {
  currentUser: null,
  isUserLoggedIn: false,
  authStateLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitalState,
  reducers: {
    setLogin: (state, action) => {
      state.currentUser = action.payload.user;
      state.isUserLoggedIn = true;
    },
    setLogout: (state) => {
      state.currentUser = null;
      state.isUserLoggedIn = false;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
