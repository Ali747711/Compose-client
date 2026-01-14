import { type Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import type { Product } from "../../../libs/data/types/product";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import UserService from "../../services/user.service";
import type { User } from "../../../libs/data/types/user";
import BestSeller from "./BestSeller";
import ProductService from "../../services/product.service";
import NewProducts from "./NewProducts";
import HeroSection from "./HeroSection";
import Categories from "./Categories";
import Users from "./Users";
// import Swiped from "../../components/Swiper";

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: User[]) => dispatch(setTopUsers(data)),
});

const Home = () => {
  const { setTopUsers, setNewDishes, setPopularDishes } = actionDispatch(
    useDispatch()
  );

  useEffect(() => {
    console.log("🏠 HomePage mounted - fetching data...");

    // FETCH Top users (sorted by views)
    const userService = new UserService();
    userService.getTopUsers().then((data) => {
      // console.log("✅ Top users loaded:", data);
      setTopUsers(data); // DISPATCH TO REDUX!
    });

    // FETCH Popular dishes (sorted by views)
    const productService = new ProductService();

    productService
      .getProducts({
        page: 1,
        limit: 10,
        order: "productViews",
      })
      .then((data) => {
        console.log("Home page, fetching PopularDishes --------");
        setPopularDishes(data);
      })
      .catch((err) => {
        console.log("Error in fetching PopularDishes in Home page: ", err);
      });

    // Fetching new Dishes
    productService
      .getProducts({
        page: 1,
        limit: 10,
        order: "createdAt",
      })
      .then((data) => {
        console.log("Home page, fetching New Products --------");
        setNewDishes(data);
      })
      .catch((err) => {
        console.log("Error in fetching NewDishes in Home page: ", err);
      });
  }, []);
  // console.log("Top users: ", topUsers);
  return (
    <div className="min-h-50vh w-full">
      <HeroSection />
      <Categories />
      {/* <Swiped /> */}
      <BestSeller />
      <NewProducts />
      <Users />
    </div>
  );
};

export default Home;
