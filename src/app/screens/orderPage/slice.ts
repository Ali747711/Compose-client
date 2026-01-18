import { createSlice } from "@reduxjs/toolkit";
import { OrderPageState } from "../../../libs/data/types/pages";

const initialState: OrderPageState = {
  pauseOrders: [],
  processOrders: [],
  finishOrders: [],
};
const OrderPageSlice = createSlice({
  name: "orderPage",
  initialState,
  reducers: {
    setPauseProducts: (state, action) => {
      state.pauseOrders = action.payload;
    },
    setProcessProducts: (state, action) => {
      state.processOrders = action.payload;
    },
    setFinishProducts: (state, action) => {
      state.finishOrders = action.payload;
    },
  },
});

export const { setFinishProducts, setPauseProducts, setProcessProducts } =
  OrderPageSlice.actions;
const OrderPageReducer = OrderPageSlice.reducer;
export default OrderPageReducer;
