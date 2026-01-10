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
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            New Products
          </h1>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
      </div>
      <Swiped products={newDishes} />
    </div>
  );
};

export default NewProducts;
