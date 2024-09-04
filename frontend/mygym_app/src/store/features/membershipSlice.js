import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  membershipData: [],
};

const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {
    setMembershipDetails : (state, action) => {
      state.membershipData = action.payload;
    },
  },
});

export const { setMembershipDetails } = membershipSlice.actions;

export default membershipSlice.reducer;
