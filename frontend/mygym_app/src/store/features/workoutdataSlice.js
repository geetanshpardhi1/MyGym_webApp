import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workoutData: [],
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkoutData(state, action) {
      state.workoutData = action.payload;
    },
    clearWorkoutData: (state) => {
      state.workoutData = [];
    },
  },
});

export const { setWorkoutData, clearWorkoutData } = workoutSlice.actions;

export default workoutSlice.reducer;
