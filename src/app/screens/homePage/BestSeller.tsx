import { retrievePopularDishes } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import Swiped from "../../components/Swiper";

const PopularDishRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({
    popularDishes,
  })
);

const BestSeller = () => {
  const { popularDishes } = useSelector(PopularDishRetriever);
  // console.log("Popular dishes: ", popularDishes);

  return (
    <div className="mt-16">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Best Seller
          </h1>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
      </div>
      <Swiped products={popularDishes} />
    </div>
  );
};

export default BestSeller;
