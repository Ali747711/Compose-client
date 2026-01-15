import { createSlice } from "@reduxjs/toolkit";
import { CheckoutPageState } from "../../../libs/data/types/pages";

const initialState: CheckoutPageState = {
  addresses: [],
  payments: [],
  products: [],
};
const CheckoutPageSlice = createSlice({
  name: "checkoutPage",
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setPayments, setAddresses, setProducts } =
  CheckoutPageSlice.actions;
const CheckoutPageReducer = CheckoutPageSlice.reducer;
export default CheckoutPageReducer;
