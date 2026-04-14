import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
};

const initialState: AuthState = {
  token: localStorage.getItem("token"), // ambil dari localStorage
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      localStorage.clear();
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
