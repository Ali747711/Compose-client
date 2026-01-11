import { createSlice } from "@reduxjs/toolkit";
import { UserProfilePageState } from "../../../libs/data/types/pages";

const initialState: UserProfilePageState = {
  products: [],
  userDetails: null,
  addresses: [],
  orders: [],
  payments: [],
};

const UserProfilePageSlice = createSlice({
  name: "userProfilePage",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setUserAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    setUserOrders: (state, action) => {
      state.orders = action.payload;
    },
    setUserPayments: (state, action) => {
      state.payments = action.payload;
    },
  },
});

export const {
  setProducts,
  setUserDetails,
  setUserAddresses,
  setUserOrders,
  setUserPayments,
} = UserProfilePageSlice.actions;

const UserProfilePageReducer = UserProfilePageSlice.reducer;
export default UserProfilePageReducer;
