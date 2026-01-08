import { createSelector } from "@reduxjs/toolkit";
import type { AppRootState } from "../../../libs/data/types/pages";

const selectProductsPage = (state: AppRootState) => state.categoryPage;

export const retrieveProducts = createSelector(
  selectProductsPage,
  (CategoryPage) => CategoryPage.products
);

export const retrieveCoffee = createSelector(
  selectProductsPage,
  (CategoryPage) => CategoryPage.coffee
);
export const retrieveTeaTeaBeverage = createSelector(
  selectProductsPage,
  (CategoryPage) => CategoryPage.tea_tea_beverage
);
export const retrieveMilkshake = createSelector(
  selectProductsPage,
  (CategoryPage) => CategoryPage.milkshake
);
export const retrieveDecafCoffee = createSelector(
  selectProductsPage,
  (CategoryPage) => CategoryPage.decaf_coffee
);
export const retrieveColdBrew = createSelector(
  selectProductsPage,
  (CategoryPage) => CategoryPage.cold_brew
);
export const retrieveBeverage = createSelector(
  selectProductsPage,
  (CategoryPage) => CategoryPage.beverage
);
export const retrieveSmoothie = createSelector(
  selectProductsPage,
  (CategoryPage) => CategoryPage.smoothie
);
export const retrieveJuice = createSelector(
  selectProductsPage,
  (CategoryPage) => CategoryPage.juice
);
export const retrieveAde = createSelector(
  selectProductsPage,
  (CategoryPage) => CategoryPage.ade
);
export const retrieveFrappe = createSelector(
  selectProductsPage,
  (CategoryPage) => CategoryPage.frappe
);
