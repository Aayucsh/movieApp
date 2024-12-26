import { createSlice } from "@reduxjs/toolkit";
import { info } from "autoprefixer";

export const tvSlice = createSlice({
  name: "tv",
  initialState: {
    info: null,
  },
  reducers: {
    loadtv: (state, action) => {
      state.info = action.payload;
    },
    removetv: (state) => {
      state.info = null;
    },
  },
});

export const { loadtv, removetv } = tvSlice.actions;
export default tvSlice.reducer;
