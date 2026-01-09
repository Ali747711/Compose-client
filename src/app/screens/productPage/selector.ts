import { createSelector } from "@reduxjs/toolkit";
import type { AppRootState } from "../../../libs/data/types/pages";

const selectProductPage = (state: AppRootState) => state.productsPage;

export const retrieveProducts = createSelector(
  selectProductPage,
  (ProductPage) => ProductPage.products
);

// export const retrieveAllCategories = createSelector(
//   selectCategoryPage,
//   (CategoryPage) => [
//     { name: "Coffee", key: "coffee", products: CategoryPage.coffee },
//     { name: "Ade", key: "ade", products: CategoryPage.ade },
//     { name: "Beverage", key: "beverage", products: CategoryPage.beverage },
//     { name: "Cold Brew", key: "cold_brew", products: CategoryPage.cold_brew },
//     {
//       name: "Decaf Coffee",
//       key: "decaf_coffee",
//       products: CategoryPage.decaf_coffee,
//     },
//     { name: "Juice", key: "juice", products: CategoryPage.juice },
//     { name: "Milkshake", key: "milkshake", products: CategoryPage.milkshake },
//     { name: "Smoothie", key: "smoothie", products: CategoryPage.smoothie },
//     {
//       name: "Tea and Tea Beverage",
//       key: "tea_tea_beverage",
//       products: CategoryPage.tea_tea_beverage,
//     },
//     {
//       name: "Frappe",
//       key: "frappe",
//       products: CategoryPage.frappe,
//     },
//   ]
// );
