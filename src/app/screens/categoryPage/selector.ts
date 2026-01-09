import { createSelector } from "@reduxjs/toolkit";
import type { AppRootState } from "../../../libs/data/types/pages";

const selectCategoryPage = (state: AppRootState) => state.categoryPage;

export const retrieveCoffee = createSelector(
  selectCategoryPage,
  (CategoryPage) => CategoryPage.coffee
);
export const retrieveAde = createSelector(
  selectCategoryPage,
  (CategoryPage) => CategoryPage.ade
);
export const retrieveTeaTeaBeverage = createSelector(
  selectCategoryPage,
  (CategoryPage) => CategoryPage.tea_tea_beverage
);
export const retrieveMilkshake = createSelector(
  selectCategoryPage,
  (CategoryPage) => CategoryPage.milkshake
);
export const retrieveDecafCoffee = createSelector(
  selectCategoryPage,
  (CategoryPage) => CategoryPage.decaf_coffee
);
export const retrieveColdBrew = createSelector(
  selectCategoryPage,
  (CategoryPage) => CategoryPage.cold_brew
);
export const retrieveBeverage = createSelector(
  selectCategoryPage,
  (CategoryPage) => CategoryPage.beverage
);
export const retrieveSmoothie = createSelector(
  selectCategoryPage,
  (CategoryPage) => CategoryPage.smoothie
);
export const retrieveJuice = createSelector(
  selectCategoryPage,
  (CategoryPage) => CategoryPage.juice
);
export const retrieveFrappe = createSelector(
  selectCategoryPage,
  (CategoryPage) => CategoryPage.frappe
);

export const retrieveProducts = createSelector(
  selectCategoryPage,
  (CategoryPage) => CategoryPage.products
);

export const retrieveAllCategories = createSelector(
  selectCategoryPage,
  (CategoryPage) => [
    { name: "Rich Coffee", key: "coffee", products: CategoryPage.coffee },
    { name: "Sparkling Ade", key: "ade", products: CategoryPage.ade },
    {
      name: "Refreshing Beverages",
      key: "beverage",
      products: CategoryPage.beverage,
    },
    {
      name: "Smooth Cold Brew",
      key: "cold_brew",
      products: CategoryPage.cold_brew,
    },
    {
      name: "Gentle Decaf Coffee",
      key: "decaf_coffee",
      products: CategoryPage.decaf_coffee,
    },
    { name: "Fresh Juice", key: "juice", products: CategoryPage.juice },
    {
      name: "Creamy Milkshake",
      key: "milkshake",
      products: CategoryPage.milkshake,
    },
    {
      name: "Velvety Smoothie",
      key: "smoothie",
      products: CategoryPage.smoothie,
    },
    {
      name: "Premium Tea Selection",
      key: "tea_tea_beverage",
      products: CategoryPage.tea_tea_beverage,
    },
    {
      name: "Chilled Frappe",
      key: "frappe",
      products: CategoryPage.frappe,
    },
  ]
);
