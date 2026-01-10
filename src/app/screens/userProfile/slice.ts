import { createSlice } from "@reduxjs/toolkit";
import { UserProfilePageState } from "../../../libs/data/types/pages";

const initialState: UserProfilePageState = {
  products: [],
};

const UserProfilePageSlice = createSlice({
  name: "userProfilePage",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = UserProfilePageSlice.actions;

const UserProfilePageReducer = UserProfilePageSlice.reducer;
export default UserProfilePageReducer;
