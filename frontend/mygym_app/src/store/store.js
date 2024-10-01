import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import workoutReducer from "./features/wotkoutdataSlice";
import membershipReducer from "./features/membershipSlice";
import goalsReducer from "./features/goalsSlice";
import profileReducer from './features/profileSlice';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    workout: workoutReducer,
    membership: membershipReducer,
    goals: goalsReducer,
    profile: profileReducer,
  },
});

export default store;
