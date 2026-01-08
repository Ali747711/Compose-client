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
      <p className="text-2xl text-main-text md:text-3xl font-medium">
        Best Seller
      </p>
      <Swiped products={popularDishes} />
    </div>
  );
};

export default BestSeller;
