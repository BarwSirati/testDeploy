import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "cookies-next";

const token = `Bearer ` + getCookie("token");

export const initialState = {
  user: null,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setError: (state) => {
      state.error = true;
    },
    setCredentials: (state, action) => {
      state.error = false;
      state.user = action.payload;
    },
  },
});

export const { setCredentials, setError } = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;
