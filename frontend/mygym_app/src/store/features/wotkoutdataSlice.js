import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workoutData: null,
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkoutData: (state, action) => {
      state.workoutData = action.payload;
    },
  },
});

export const { setWorkoutData } = workoutSlice.actions;

export default workoutSlice.reducer;
