import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    SetUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { SetUser } = userSlice.actions;
export default userSlice.reducer;
