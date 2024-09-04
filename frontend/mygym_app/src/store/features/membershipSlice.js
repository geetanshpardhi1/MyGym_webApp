import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  membershipData: [],
};

const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {
    setMembershipDetails: (state, action) => {
      state.membershipData = action.payload;
    },
    clearMembershipDetails(state) {
      state.membershipData = null;
    },
  },
});

export const { setMembershipDetails, clearMembershipDetails } =
  membershipSlice.actions;

export default membershipSlice.reducer;
