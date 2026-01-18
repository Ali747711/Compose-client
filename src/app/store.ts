import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import CategoryPageReducer from "./screens/categoryPage/slice";
import ProductPageReducer from "./screens/productPage/slice";
import UserProfilePageReducer from "./screens/userProfile/slice";
import CheckoutPageReducer from "./screens/checkoutPage/slice";
import CartPageReducer from "./screens/cart/slice";
import OrderPageReducer from "./screens/orderPage/slice";

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
    productsPage: ProductPageReducer,
    categoryPage: CategoryPageReducer,
    userProfilePage: UserProfilePageReducer,
    checkoutPage: CheckoutPageReducer,
    cartPage: CartPageReducer,
    orderPape: OrderPageReducer,
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
