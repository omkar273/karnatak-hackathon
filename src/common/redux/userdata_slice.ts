import { createSlice } from "@reduxjs/toolkit";

type userdataState = {
  name: string;
  email: string;
  username: string;
  policeId: string;
};

const userdataInitialState: userdataState = {
  email: "",
  name: "",
  policeId: "",
  username: "",
};

const userdataSlice = createSlice({
  name: "userdata",
  initialState: userdataInitialState,
  reducers: {
    setUserdata: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.policeId = action.payload.policeId;
      state.username = action.payload.username;
    },
    resetUserdata: (state) => {
      state.email = userdataInitialState.email;
      state.policeId = userdataInitialState.policeId;
      state.username = userdataInitialState.username;
      state.name = userdataInitialState.name;
    },
  },
});

export default userdataSlice.reducer;

export const { resetUserdata, setUserdata } = userdataSlice.actions;
