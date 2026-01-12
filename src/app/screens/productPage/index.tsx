import { useEffect, useState } from "react";
import ProductHero from "./ProductHero";
import { useDispatch, useSelector } from "react-redux";
import { retrieveChosenProduct, retrieveProducts } from "./selector";
import ProductService from "../../services/product.service";
import { setProducts, setChosenProduct } from "./slice";
import { useParams } from "react-router-dom";
import type { Product } from "../../../libs/data/types/product";
import { AlertError } from "../../../libs/sweetAlert";
import Swal from "sweetalert2";
import { useGlobals } from "../../hooks/useGlobal";
import Review from "./Review";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAccountIcon, LockIcon } from "@hugeicons/core-free-icons";
import Recommended from "./Recommended";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { setShowUserLogin, authUser } = useGlobals();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get data from Redux BEFORE useEffect
  const products: Product[] = useSelector(retrieveProducts);
  const chosenProduct: Product | null = useSelector(retrieveChosenProduct);

  useEffect(() => {
    if (!authUser) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const productService = new ProductService();

      try {
        // Fetch all products if not already loaded
        if (!products || products.length === 0) {
          const allProducts = await productService.getAllProducts();
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

        if (
          err &&
          typeof err === "object" &&
          "status" in err &&
          err.status === 401
        ) {
          Swal.fire({
            icon: "error",
            text:
              (err as unknown as { response: { data: { message: string } } })
                .response?.data?.message || "Authentication required",
          }).then(() => setShowUserLogin(true));
        } else {
          AlertError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, authUser, dispatch]); // Removed products and chosenProduct from dependencies

  const recommendedProducts: Product[] =
    products?.filter(
      (product) =>
        product?.productCollection === chosenProduct?.productCollection
    ) || [];

  // Not authenticated
  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="max-w-md w-full">
          {/* Icon Container */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Outer Circle with Pulse Animation */}
              <div className="absolute inset-0 bg-main/20 rounded-full animate-ping"></div>
              {/* Main Icon Circle */}
              <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-br from-main to-main-dull rounded-full shadow-lg">
                <HugeiconsIcon
                  icon={LockIcon}
                  size={40}
                  color="#2e2726"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-main-text mb-3">
              Authentication Required
            </h1>
            <p className="text-gray-600 text-lg mb-2">
              Please log in to view product details
            </p>
            <p className="text-gray-500 text-sm">
              Create an account or sign in to access exclusive products and
              features
            </p>
          </div>

          {/* Login Button */}
          <button
            onClick={() => setShowUserLogin(true)}
            className="w-full bg-main hover:bg-main-dull text-main-text font-bold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 border-2 border-main-dull mb-4"
          >
            <HugeiconsIcon icon={UserAccountIcon} size={20} />
            Login to Continue
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Benefits List */}
          <div className="bg-main/5 rounded-xl p-6 border border-main/20">
            <h3 className="font-semibold text-main-text mb-3 text-sm uppercase tracking-wide">
              Why Create an Account?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-main-dull font-bold mt-0.5">✓</span>
                <span>Access exclusive product details and pricing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-main-dull font-bold mt-0.5">✓</span>
                <span>Save items to your cart and wishlist</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-main-dull font-bold mt-0.5">✓</span>
                <span>Track your orders and delivery status</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-main-dull font-bold mt-0.5">✓</span>
                <span>Get personalized product recommendations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

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
