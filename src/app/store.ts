import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import CategoryPageReducer from "./screens/categoryPage/slice";
import ProductPageReducer from "./screens/productPage/slice";

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
    productsPage: ProductPageReducer,
    categoryPage: CategoryPageReducer,
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
