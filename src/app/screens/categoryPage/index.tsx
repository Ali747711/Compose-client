import { useEffect } from "react";
import ProductService from "../../services/product.service";
import { useDispatch } from "react-redux";
import { type Dispatch } from "@reduxjs/toolkit";
import {
  setProducts,
  setAde,
  setBeverage,
  setCoffee,
  setCold_Brew,
  setDecaf_Coffee,
  setFrappe,
  setJuice,
  setMilkshake,
  setSmoothie,
  setTea_Tea_Beverage,
} from "./slice";

import { ProductCollection } from "../../../libs/enums/product.enum";
import { AlertError } from "../../../libs/sweetAlert";
import type { Product } from "../../../libs/data/types/product";
import Category from "./categories";

const actionDispatch = (dispatch: Dispatch) => ({
  setAde: (data: Product[]) => dispatch(setAde(data)),
  setBeverage: (data: Product[]) => dispatch(setBeverage(data)),
  setCoffee: (data: Product[]) => dispatch(setCoffee(data)),
  setCold_Brew: (data: Product[]) => dispatch(setCold_Brew(data)),
  setDecaf_Coffee: (data: Product[]) => dispatch(setDecaf_Coffee(data)),
  setFrappe: (data: Product[]) => dispatch(setFrappe(data)),
  setJuice: (data: Product[]) => dispatch(setJuice(data)),
  setMilkshake: (data: Product[]) => dispatch(setMilkshake(data)),
  setSmoothie: (data: Product[]) => dispatch(setSmoothie(data)),
  setTea_Tea_Beverage: (data: Product[]) => dispatch(setTea_Tea_Beverage(data)),
});

const CategoryPage = () => {
  const dispatch = useDispatch();
  const {
    setAde,
    setBeverage,
    setCoffee,
    setCold_Brew,
    setDecaf_Coffee,
    setFrappe,
    setJuice,
    setMilkshake,
    setSmoothie,
    setTea_Tea_Beverage,
  } = actionDispatch(useDispatch());

  useEffect(() => {
    const productService = new ProductService();

    productService
      .getAllProducts()
      .then((data) => {
        // console.log("Fetched products:", data);
        // console.log(
        //   "ADE drinks: ",
        //   data.filter(
        //     (product) => product.productCollection === ProductCollection.ADE
        //   )
        // );
        dispatch(setProducts(data));

        setAde(
          data.filter((p) => p.productCollection === ProductCollection.ADE)
        );
        setBeverage(
          data.filter((p) => p.productCollection === ProductCollection.BEVERAGE)
        );
        setCoffee(
          data.filter((p) => p.productCollection === ProductCollection.COFFEE)
        );
        setCold_Brew(
          data.filter(
            (p) => p.productCollection === ProductCollection.COLD_BREW
          )
        );
        setDecaf_Coffee(
          data.filter(
            (p) => p.productCollection === ProductCollection.DECAF_COFFEE
          )
        );
        setFrappe(
          data.filter((p) => p.productCollection === ProductCollection.FRAPPE)
        );
        setJuice(
          data.filter((p) => p.productCollection === ProductCollection.JUICE)
        );
        setMilkshake(
          data.filter(
            (p) => p.productCollection === ProductCollection.MILKSHAKE
          )
        );
        setSmoothie(
          data.filter((p) => p.productCollection === ProductCollection.SMOOTHIE)
        );
        setTea_Tea_Beverage(
          data.filter(
            (p) => p.productCollection === ProductCollection.TEA_TEA_BEVERAGE
          )
        );
      })
      .catch((err) => {
        console.error(err);
        AlertError("Failed to load products");
      });
  }, []);

  return (
    <div className="mt-16">
      <Category />
    </div>
  );
};

export default CategoryPage;
