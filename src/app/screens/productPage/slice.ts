import { createSlice } from "@reduxjs/toolkit";
import type { ProductPageState } from "../../../libs/data/types/pages";

const initialState: ProductPageState = {
  products: [],
};

const ProductPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = ProductPageSlice.actions;

const ProductPageReducer = ProductPageSlice.reducer;

export default ProductPageReducer;
