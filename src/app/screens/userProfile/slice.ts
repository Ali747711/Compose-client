import { createSlice } from "@reduxjs/toolkit";
import { UserProfilePageState } from "../../../libs/data/types/pages";

const initialState: UserProfilePageState = {
  products: [],
  userDetails: null,
  addresses: [],
  payments: [],

  // Orders
  pauseOrders: [],
  processOrders: [],
  finishOrders: [],
  cancelOrders: [],
  allOrders: [],
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
    setUserPayments: (state, action) => {
      state.payments = action.payload;
    },
    setPauseOrders: (state, action) => {
      state.pauseOrders = action.payload;
    },
    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },
    setFinishOrders: (state, action) => {
      state.finishOrders = action.payload;
    },
    setCancelOrders: (state, action) => {
      state.cancelOrders = action.payload;
    },
    setAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
  },
});

export const {
  setProducts,
  setUserDetails,
  setUserAddresses,
  setUserPayments,
  setPauseOrders,
  setProcessOrders,
  setFinishOrders,
  setCancelOrders,
  setAllOrders,
} = UserProfilePageSlice.actions;

const UserProfilePageReducer = UserProfilePageSlice.reducer;
export default UserProfilePageReducer;
