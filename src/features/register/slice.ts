import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./type";

const initialState = {
  registerInfo: INITIAL_STATE,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    saveRegisterInfo: (state, action) => {
      state.registerInfo = action.payload;
    },
    resetRegisterInfo: () => initialState,
  },
});

export const { saveRegisterInfo, resetRegisterInfo } = registerSlice.actions;
export default registerSlice.reducer;
