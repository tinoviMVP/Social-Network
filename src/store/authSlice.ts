import { createSlice } from "@reduxjs/toolkit";

interface IAuthSliceState {
  user: IAuth | null;
}

export interface IAuth {
  mail: string;
  phone_number: string;
  user_id: number;
  name: string;
  reg_date: string;
  city: string;
}

const initialState: IAuthSliceState = {
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    authUser(state, action) {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { authUser } = authSlice.actions;
