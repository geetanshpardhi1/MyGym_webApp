import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goalsData: [],
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setGoals : (state, action) => {
      state.goalsData = action.payload;
    },
  },
});

export const { setGoals } = goalsSlice.actions;

export default goalsSlice.reducer;
