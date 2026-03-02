import { createSlice } from "@reduxjs/toolkit";

export type AuthStatus = "unknown" | "authenticated" | "unauthenticated";

interface AuthState {
  status: AuthStatus;
}

const initialState: AuthState = {
  status: "unknown",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      state.status = "authenticated";
    },
    setUnauthenticated: (state) => {
      state.status = "unauthenticated";
    },
    resetAuth: () => initialState,
  },
});

export const { setAuthenticated, setUnauthenticated, resetAuth } =
  authSlice.actions;

export default authSlice.reducer;
