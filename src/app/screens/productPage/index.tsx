import { useEffect, useState } from "react";
import ProductHero from "./ProductHero";
import { useDispatch, useSelector } from "react-redux";
import { retrieveChosenProduct, retrieveProducts } from "./selector";
import ProductService from "../../services/product.service";
import { setProducts, setChosenProduct } from "./slice";
import { useParams } from "react-router-dom";
import type { Product } from "../../../libs/data/types/product";
import { AlertError } from "../../../libs/sweetAlert";
import Review from "./Review";
import Recommended from "./Recommended";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get data from Redux BEFORE useEffect
  const products: Product[] = useSelector(retrieveProducts);
  const chosenProduct: Product | null = useSelector(retrieveChosenProduct);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const productService = new ProductService();

      try {
        // Fetch all products if not already loaded
        if (!products || products.length === 0) {
          const allProducts = await productService.getAllProducts();
          console.log("Product count: ", allProducts.length);
          dispatch(setProducts(allProducts));
        }

        // Always fetch the chosen product when ID changes
        if (id) {
          const productData = await productService.getProduct(id);
          // console.log("Chosen Product Component, data: ", productData);
          dispatch(setChosenProduct(productData));
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        console.error("Error fetching product data:", error);
        setError(error?.message || "Failed to load product");
        AlertError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, dispatch]); // Products are public - no auth dependency needed

  const recommendedProducts: Product[] =
    products?.filter(
      (product) =>
        product?.productCollection === chosenProduct?.productCollection
    ) || [];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-main mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-50 text-red-600 p-6 rounded-xl mb-4">
            <h2 className="text-xl font-bold mb-2">Error Loading Product</h2>
            <p>{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-main hover:bg-main-dull text-main-text font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No product found
  if (!chosenProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="bg-gray-100 p-6 rounded-xl mb-4">
            <h2 className="text-xl font-bold text-main-text mb-2">
              Product Not Found
            </h2>
            <p className="text-gray-600">
              The product you're looking for doesn't exist or has been removed.
            </p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="bg-main hover:bg-main-dull text-main-text font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 max-w-7xl mx-auto py-6 px-4">
      <ProductHero product={chosenProduct} />
      <Review />
      <Recommended products={recommendedProducts} />
    </div>
  );
};

export default Product;
