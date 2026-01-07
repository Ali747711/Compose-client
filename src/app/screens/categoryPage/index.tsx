import { useEffect } from "react";
import Promotion from "./Promotion";
import ProductService from "../../services/product.service";
import { useDispatch, useSelector } from "react-redux";
import { createSelector, type Dispatch } from "@reduxjs/toolkit";
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

import {
  retrieveAde,
  retrieveBeverage,
  retrieveCoffee,
  retrieveColdBrew,
  retrieveDecafCoffee,
  retrieveFrappe,
  retrieveJuice,
  retrieveMilkshake,
  retrieveSmoothie,
  retrieveTeaTeaBeverage,
} from "./selector";

import ProductCard from "../../components/ProductCard";
import { ProductCollection } from "../../../libs/enums/product.enum";
import { AlertError } from "../../../libs/sweetAlert";
import type { Product } from "../../../libs/data/types/product";

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
// Create a compound selector that returns all categories at once
const AdeRetriever = createSelector(retrieveAde, (ade) => ({ ade }));
const CoffeeRetriever = createSelector(retrieveCoffee, (coffee) => ({
  coffee,
}));

const Category = () => {
  // const dispatch = useDispatch();
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

  // Use ONE useSelector with the compound selector — just like your NewProducts!
  const { ade } = useSelector(AdeRetriever);
  const { coffee } = useSelector(CoffeeRetriever);

  console.log("Categories loaded:", { coffee }); // Debug

  useEffect(() => {
    const productService = new ProductService();

    productService
      .getAllProducts()
      .then((data) => {
        console.log("Fetched products:", data);

        setProducts(data);

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
    <div>
      <Promotion />
      <section className="my-16">
        <h2 className="text-2xl md:text-3xl font-medium mb-8">Ade</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ade.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Category;
