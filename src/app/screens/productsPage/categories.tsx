import { createSelector } from "@reduxjs/toolkit";
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
  retrieveProducts,
} from "./selector";
import { useSelector } from "react-redux";

// Create a compound selector that returns all categories at once
const ProductRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));
const MilkshakeRetriever = createSelector(retrieveAde, (milkshake) => ({
  milkshake,
}));
const CoffeeRetriever = createSelector(retrieveCoffee, (coffee) => ({
  coffee,
}));

const Category = () => {
  // Use ONE useSelector with the compound selector — just like your NewProducts!
  const { milkshake } = useSelector(MilkshakeRetriever);
  const { coffee } = useSelector(CoffeeRetriever);
  const { products } = useSelector(ProductRetriever);
  console.log("Milk shake: ", milkshake);
  console.log("Coffee: ", coffee);
  console.log("Products: ", products);
  return (
    <div>
      <h2>New Category Page</h2>
    </div>
  );
};

export default Category;
