import { createSelector } from "@reduxjs/toolkit";
import type { AppRootState } from "../../../libs/data/types/pages";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveCoffee = createSelector(
  selectProductsPage,
  (ProductPage) => ProductPage.coffee
);
export const retrieveAde = createSelector(
  selectProductsPage,
  (ProductPage) => ProductPage.ade
);
export const retrieveTeaTeaBeverage = createSelector(
  selectProductsPage,
  (ProductPage) => ProductPage.tea_tea_beverage
);
export const retrieveMilkshake = createSelector(
  selectProductsPage,
  (ProductPage) => ProductPage.milkshake
);
export const retrieveDecafCoffee = createSelector(
  selectProductsPage,
  (ProductPage) => ProductPage.decaf_coffee
);
export const retrieveColdBrew = createSelector(
  selectProductsPage,
  (ProductPage) => ProductPage.cold_brew
);
export const retrieveBeverage = createSelector(
  selectProductsPage,
  (ProductPage) => ProductPage.beverage
);
export const retrieveSmoothie = createSelector(
  selectProductsPage,
  (ProductPage) => ProductPage.smoothie
);
export const retrieveJuice = createSelector(
  selectProductsPage,
  (ProductPage) => ProductPage.juice
);
export const retrieveFrappe = createSelector(
  selectProductsPage,
  (ProductPage) => ProductPage.frappe
);

export const retrieveProducts = createSelector(
  selectProductsPage,
  (ProductPage) => ProductPage.products
);

export const retrieveAllCategories = createSelector(
  selectProductsPage,
  (ProductPage) => [
    { name: "Coffee", key: "coffee", products: ProductPage.coffee },
    { name: "Ade", key: "ade", products: ProductPage.ade },
    { name: "Beverage", key: "beverage", products: ProductPage.beverage },
    { name: "Cold Brew", key: "cold_brew", products: ProductPage.cold_brew },
    {
      name: "Decaf Coffee",
      key: "decaf_coffee",
      products: ProductPage.decaf_coffee,
    },
    { name: "Juice", key: "juice", products: ProductPage.juice },
    { name: "Milkshake", key: "milkshake", products: ProductPage.milkshake },
    { name: "Smoothie", key: "smoothie", products: ProductPage.smoothie },
    {
      name: "Tea and Tea Beverage",
      key: "tea_tea_beverage",
      products: ProductPage.tea_tea_beverage,
    },
  ]
);
