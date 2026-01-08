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
  retrieveAllCategories,
} from "./selector";
import { useSelector } from "react-redux";
import type { Product } from "../../../libs/data/types/product";
import Swiped from "../../components/Swiper";

// Create a compound selector that returns all categories at once
const AllRetriever = createSelector(
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
  (
    ade,
    beverage,
    coffee,
    cold_brew,
    decaf_coffee,
    frappe,
    juice,
    milkshake,
    smoothie,
    tea_tea_beverage,
    products
  ) => ({
    ade,
    beverage,
    coffee,
    cold_brew,
    decaf_coffee,
    frappe,
    juice,
    milkshake,
    smoothie,
    tea_tea_beverage,
    products,
  })
);

const Category = () => {
  // Use ONE useSelector with the compound selector — just like your NewProducts!
  const categories = useSelector(AllRetriever);
  const allCategories = useSelector(retrieveAllCategories);
  console.log("Categories: ", categories);
  console.log("All Categories: ", allCategories);

  console.log(allCategories.map((p) => console.log(p.name)));

  return (
    <div>
      {allCategories.map((category, i) => (
        <CategorySection
          key={i}
          title={category.name}
          products={category.products}
        />
      ))}
    </div>
  );
};

const CategorySection = ({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-7">
      <h1 className="text-main-text text-md md:text-2xl">{title} Drinks</h1>
      {products.length !== 0 ? (
        <div>
          <Swiped products={products} />
        </div>
      ) : (
        <div>No products for {title.toUpperCase()}</div>
      )}
    </section>
  );
};

export default Category;
