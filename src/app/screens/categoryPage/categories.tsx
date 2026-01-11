import { retrieveAllCategories } from "./selector";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { Spinner } from "@heroui/react";

const Category = () => {
  const { category } = useParams();
  const allCategories = useSelector(retrieveAllCategories);
  const selectedCategory = allCategories.find(
    (product) => product.key === category
  );

  return (
    <div className="max-w-[1800px] mx-auto px-4 md:px-8 py-8">
      {/* Category Header */}
      {selectedCategory && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {selectedCategory.name}
            </h1>
            <span className="px-3 py-1 bg-main/20 text-main-dull font-semibold rounded-lg text-sm">
              {selectedCategory.products.length} Products
            </span>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
        </div>
      )}

      {/* Products Grid */}
      {selectedCategory?.products && selectedCategory.products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {selectedCategory.products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex max-w-[1800px] items-center justify-center min-h-110  gap-4">
          <Spinner
            size="lg"
            color="warning"
            label="Loading ....."
            labelColor="warning"
          />
        </div>
      )}
    </div>
  );
};

export default Category;
