import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../libs/data/types/pages";

const selectUserProfilePage = (state: AppRootState) => state.userProfilePage;

export const retrieveProducts = createSelector(
  selectUserProfilePage,
  (UserProfilePage) => UserProfilePage.products
);

export const retrieveUserDetails = createSelector(
  selectUserProfilePage,
  (UserProfilePage) => UserProfilePage.userDetails
);
export const retrieveUserAddresses = createSelector(
  selectUserProfilePage,
  (UserProfilePage) => UserProfilePage.addresses
);
export const retrieveUserOrders = createSelector(
  selectUserProfilePage,
  (UserProfilePage) => UserProfilePage.orders
);
export const retrieveUserPayments = createSelector(
  selectUserProfilePage,
  (UserProfilePage) => UserProfilePage.payments
);
