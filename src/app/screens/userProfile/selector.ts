import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../libs/data/types/pages";

const selectUserProfilePage = (state: AppRootState) => state.userProfilePage;

export const retrieveProducts = createSelector(
  selectUserProfilePage,
  (UserProfilePage) => UserProfilePage.products
);
