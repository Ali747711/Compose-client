import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../libs/data/types/pages";

const selectCartPage = (state: AppRootState) => state.cartPage;

export const retrieveCartPageProducts = createSelector(
  selectCartPage,
  (CartPage) => CartPage.products
);
