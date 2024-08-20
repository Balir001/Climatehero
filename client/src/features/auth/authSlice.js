// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    redirectTo: null,
    service: null,
  },
  reducers: {
    setService: (state, action) => {
      state.service = action.payload;
    },
    setRedirectTo: (state, action) => {
      state.redirectTo = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setService, setRedirectTo, setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;