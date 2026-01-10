import { createSlice } from "@reduxjs/toolkit";
import type { ProductPageState } from "../../../libs/data/types/pages";

const initialState: ProductPageState = {
  products: [],
  chosenProduct: null,
};

const ProductPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
  },
});

export const { setProducts, setChosenProduct } = ProductPageSlice.actions;

const ProductPageReducer = ProductPageSlice.reducer;

export default ProductPageReducer;
