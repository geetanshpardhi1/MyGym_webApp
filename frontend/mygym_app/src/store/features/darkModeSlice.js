import { createSlice } from '@reduxjs/toolkit';

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    mode: false, 
  },
  reducers: {
    toggleDarkModeAction: (state) => {
      state.mode = !state.mode; 
    },
  },
});

export const { toggleDarkModeAction } = darkModeSlice.actions;
export default darkModeSlice.reducer;
