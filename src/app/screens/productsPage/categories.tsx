import { retrieveAllCategories } from "./selector";
import { useSelector } from "react-redux";
import type { Product } from "../../../libs/data/types/product";
import Swiped from "../../components/Swiper";

const Category = () => {
  const allCategories = useSelector(retrieveAllCategories);

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
      <h1 className="text-main-text text-2xl font-medium md:text-3xl">
        {title} <span className="text-main-dull">Drinks</span>
      </h1>
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
