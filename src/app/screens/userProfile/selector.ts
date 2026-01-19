import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../libs/data/types/pages";

const selectUserProfilePage = (state: AppRootState) => state.userProfilePage;

export const retrieveProducts = createSelector(
  selectUserProfilePage,
  (UserProfilePage) => UserProfilePage.products,
);

export const retrieveUserDetails = createSelector(
  selectUserProfilePage,
  (UserProfilePage) => UserProfilePage.userDetails,
);
export const retrieveUserAddresses = createSelector(
  selectUserProfilePage,
  (UserProfilePage) => UserProfilePage.addresses,
);

export const retrieveUserPayments = createSelector(
  selectUserProfilePage,
  (UserProfilePage) => UserProfilePage.payments,
);

export const retrievePauseOrders = createSelector(
  selectUserProfilePage,
  (UserProfilePage) => UserProfilePage.pauseOrders,
);
export const retrieveProcessOrders = createSelector(
  selectUserProfilePage,
  (UserProfilePage) => UserProfilePage.processOrders,
);
export const retrieveFinishOrders = createSelector(
  selectUserProfilePage,
  (UserProfilePage) => UserProfilePage.finishOrders,
);
export const retrieveCancelOrders = createSelector(
  selectUserProfilePage,
  (UserProfilePage) => UserProfilePage.cancelOrders,
);
export const retrieveAllOrders = createSelector(
  selectUserProfilePage,
  (UserProfilePage) => UserProfilePage.allOrders,
);
