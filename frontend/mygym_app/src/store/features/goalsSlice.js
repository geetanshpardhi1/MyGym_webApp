import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goalsData: [],
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setGoals: (state, action) => {
      state.goalsData = action.payload;
    },
    clearGoals: (state) => {
      state.goalsData = null;
    },
  },
});

export const { setGoals, clearGoals } = goalsSlice.actions;

export default goalsSlice.reducer;
