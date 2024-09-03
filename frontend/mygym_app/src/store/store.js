import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import workoutReducer from "./features/wotkoutdataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workout: workoutReducer,
  },
});
