import { UserModel } from "@/fragments/user_management/models/user_model";
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
    id: "",
    name: "",
    post: "",
    dateOfJoining: "",
    batch: "",
    height: 0,
    weight: 0,
    certification: [],
    qualification: "",
    solvedCases: 0,
    previousPosting: "",
    skills: [],
    awards: [],
    superiors_list: [""],
    underlyings: [""],
    open_cases: 0,
    closed_cases: 0,
    stationList: [],
    email: "",
    password: "",
    username: "",
    zone_id: "",
    zone_name: "",
    stationId: "",
    stationCode: "",
    currentPosting: "",
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
