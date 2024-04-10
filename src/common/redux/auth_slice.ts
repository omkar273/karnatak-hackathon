import { UserModel } from "@/fragments/user-registartion/pages/register_page";
import { createSlice } from "@reduxjs/toolkit";
import { UserCredential } from "firebase/auth";

type authstate = {
  currentUser: UserCredential | null;
  isUserLoggedIn: boolean;
  authStateLoading: boolean;
  userdata: UserModel;
};

const authInitalState: authstate = {
  currentUser: null,
  isUserLoggedIn: false,
  authStateLoading: false,
  userdata: {
    name: "",
    post: "",
    dateOfJoining: "",
    batch: "",
    currentPosting: "",
    workExperience: "",
    certification: "",
    qualification: "",
    solvedCases: "",
    height: "",
    weight: "",
    previousPosting: "",
    skills: "",
    awards: "",
    email: "",
    password: "",
    username: "",
  },
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
    setUserdata: (state, action) => {
      state.userdata = action.payload;
    },
  },
});

export const { setLogin, setLogout, setUserdata } = authSlice.actions;
export default authSlice.reducer;
