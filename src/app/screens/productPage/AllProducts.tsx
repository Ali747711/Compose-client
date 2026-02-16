import { useEffect, useState } from "react";
import { Product } from "../../../libs/data/types/product";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/product.service";
import { setProducts } from "./slice";
import { useGlobals } from "../../hooks/useGlobal";

const AllProducts = () => {
  const { searchQuery } = useGlobals();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  console.log("All products Page is laoding");
  useEffect(() => {
    const productService = new ProductService();

    productService.getAllProducts().then((data) => {
      dispatch(setProducts(data));
      // console.log(data);

      if (searchQuery.length > 0) {
        setFilteredProducts(
          data.filter((product: Product) =>
            product.productName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
          ),
        );
      } else {
        setFilteredProducts(data);
      }
    });
  }, [searchQuery]);
  const products: Product[] = useSelector(retrieveProducts);
  return (
    <div className="max-w-[1800px] mx-auto px-4 md:px-8 py-8">
      {/* Category Header */}
      {products && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              All Products
            </h1>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-medium">No products found</p>
          <p className="text-gray-400 text-sm mt-1">
            Check back later for new items
          </p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
