import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../libs/data/types/pages";

const selectCheckoutPage = (state: AppRootState) => state.checkoutPage;

export const retrieveCheckoutAddresses = createSelector(
  selectCheckoutPage,
  (CheckoutPage) => CheckoutPage.addresses
);

export const retrieveCheckoutPayments = createSelector(
  selectCheckoutPage,
  (CheckoutPage) => CheckoutPage.payments
);
export const retrieveCheckoutProducts = createSelector(
  selectCheckoutPage,
  (CheckoutPage) => CheckoutPage.products
);
