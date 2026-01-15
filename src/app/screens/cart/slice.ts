import { createSlice } from "@reduxjs/toolkit";
import { CartPageState } from "../../../libs/data/types/pages";

const initialState: CartPageState = {
  products: [],
};
const CartPageSlice = createSlice({
  name: "cartPage",
  initialState,
  reducers: {
    setCartProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setCartProducts } = CartPageSlice.actions;
const CartPageReducer = CartPageSlice.reducer;

export default CartPageReducer;
