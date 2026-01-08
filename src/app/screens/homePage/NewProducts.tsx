// Import required Swiper modules
import { createSelector } from "@reduxjs/toolkit";
import { retrieveNewDishes } from "./selector";
import { useSelector } from "react-redux";

import Swiped from "../../components/Swiper";

const NewDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

const NewProducts = () => {
  const { newDishes } = useSelector(NewDishesRetriever);
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">New Products</p>
      <Swiped products={newDishes} />
    </div>
  );
};

export default NewProducts;
