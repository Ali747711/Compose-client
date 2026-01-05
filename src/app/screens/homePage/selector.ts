import { createSelector } from "@reduxjs/toolkit";
import type { AppRootState } from "../../../libs/data/types/pages";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrievePopularDishes = createSelector(
  selectHomePage,
  (Homepage) => Homepage.popularDishes
);

export const retrieveNewDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newDishes
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers
);
