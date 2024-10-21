import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    accessToken: "",
    isAuthenticated: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    setUserData: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
  },
});

export const { setCredentials, logout,setUserData } = authSlice.actions;
export default authSlice.reducer;
