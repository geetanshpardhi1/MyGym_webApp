import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import workoutReducer from "./features/workoutdataSlice";
import membershipReducer from "./features/membershipSlice";
import goalsReducer from "./features/goalsSlice";
import profileReducer from './features/profileSlice';
import darkModeReducer from "./features/darkModeSlice";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    workout: workoutReducer,
    membership: membershipReducer,
    goals: goalsReducer,
    profile: profileReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
