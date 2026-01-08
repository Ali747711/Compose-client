import { createSlice } from "@reduxjs/toolkit";
import type { ProductsPageState } from "../../../libs/data/types/pages";

const initialState: ProductsPageState = {
  products: [],
  tea_tea_beverage: [],
  frappe: [],
  milkshake: [],
  coffee: [],
  decaf_coffee: [],
  cold_brew: [],
  beverage: [],
  smoothie: [],
  juice: [],
  ade: [],
};

const categoryPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setTea_Tea_Beverage: (state, action) => {
      state.tea_tea_beverage = action.payload;
    },
    setFrappe: (state, action) => {
      state.frappe = action.payload;
    },
    setMilkshake: (state, action) => {
      state.milkshake = action.payload;
    },
    setCoffee: (state, action) => {
      state.coffee = action.payload;
    },
    setDecaf_Coffee: (state, action) => {
      state.decaf_coffee = action.payload;
    },
    setCold_Brew: (state, action) => {
      state.cold_brew = action.payload;
    },
    setBeverage: (state, action) => {
      state.beverage = action.payload;
    },
    setSmoothie: (state, action) => {
      state.smoothie = action.payload;
    },
    setJuice: (state, action) => {
      state.juice = action.payload;
    },
    setAde: (state, action) => {
      state.ade = action.payload;
    },
  },
});

export const {
  setProducts,
  setAde,
  setBeverage,
  setCoffee,
  setCold_Brew,
  setDecaf_Coffee,
  setFrappe,
  setJuice,
  setMilkshake,
  setSmoothie,
  setTea_Tea_Beverage,
} = categoryPageSlice.actions;

const CategoryPageReducer = categoryPageSlice.reducer;

export default CategoryPageReducer;
