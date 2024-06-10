import { StationModel } from "@/fragments/station/models/station_model";
import { UserModel } from "@/fragments/user_management/models/user_model";
import { createSlice } from "@reduxjs/toolkit";
import { UserCredential } from "firebase/auth";

type authstate = {
  currentUser: UserCredential | null;
  isUserLoggedIn: boolean;
  authStateLoading: boolean;
  userdata: UserModel | null;
  stationList: StationModel[];
};

const authInitalState: authstate = {
  currentUser: null,
  stationList: [],
  isUserLoggedIn: false,
  authStateLoading: false,
  userdata: null,
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
      state.currentUser = authInitalState.currentUser;
      state.isUserLoggedIn = authInitalState.isUserLoggedIn;
      state.authStateLoading = authInitalState.authStateLoading;
      state.stationList = authInitalState.stationList;
      state.userdata = authInitalState.userdata;
    },
    setUserdata: (state, action) => {
      state.userdata = action.payload;
    },
    setStationList: (state, action) => {
      state.stationList = action.payload;
    },
  },
});

export const { setLogin, setLogout, setUserdata, setStationList } =
  authSlice.actions;
export default authSlice.reducer;
