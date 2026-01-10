import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import CategoryPageReducer from "./screens/categoryPage/slice";
import ProductPageReducer from "./screens/productPage/slice";
import UserProfilePageReducer from "./screens/userProfile/slice";

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
    productsPage: ProductPageReducer,
    categoryPage: CategoryPageReducer,
    userProfilePage: UserProfilePageReducer,
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
