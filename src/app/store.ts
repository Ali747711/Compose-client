import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import ProductsPageReducer from "./screens/productsPage/slice";

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
    productsPage: ProductsPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = typeof store.getState;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
