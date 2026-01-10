import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingCart02Icon,
  CheckmarkBadge02Icon,
  ChampionIcon,
} from "@hugeicons/core-free-icons";
import type { Product } from "../../../libs/data/types/product";
import type { CartItem } from "../../../libs/data/types/search";
import { useGlobals } from "../../hooks/useGlobal";
import { Link, useNavigate } from "react-router-dom";

interface ProductHeroProps {
  product: Product;
}

const ProductHero = (props: ProductHeroProps) => {
  const { product } = props;
  const [selectedImage, setSelectedImage] = useState(0);
  const { onAdd } = useGlobals();
  const navigate = useNavigate();

  // CREATE cart item from product
  const createCartItem = (): CartItem => ({
    _id: product._id,
    price: product.productPrice,
    name: product.productName,
    image: product.productImages[0],
    quantity: 1,
  });

  return (
    <div className="">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link className="hover:text-gray-700 cursor-pointer" to={"/"}>
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          className="hover:text-gray-700 cursor-pointer"
          to={`/products/${product?.productCollection.toLowerCase()}`}
        >
          {product?.productCollection}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-main-text font-medium">
          {product?.productName}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side - Images */}
        <div className="flex-1 max-w-xl">
          {/* Main Image Container */}
          <div className="relative bg-white rounded-2xl overflow-hidden mb-6 border border-gray-200">
            <div className="aspect-square flex items-center justify-center p-12 bg-gradient-to-br from-gray-50 to-white">
              <img
                src={product?.productImages[selectedImage]}
                alt={product?.productName}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Thumbnail Images - Fixed Size */}
          <div className="flex gap-4 justify-start">
            {product?.productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 bg-white rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? "border-main-dull shadow-md"
                    : "border-gray-200 hover:border-main/50"
                }`}
              >
                <div className="w-full h-full p-2 flex items-center justify-center">
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </button>
            ))}
            {/* Empty placeholder thumbnails if less than 4 images */}
            {/* {product?.productImages &&
              product.productImages.length < 4 &&
              Array(4 - product.productImages.length)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-xl border-2 border-gray-100"
                  />
                ))} */}
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="flex-1 max-w-xl">
          {/* Product Name */}
          <h1 className="text-3xl md:text-4xl font-bold text-main-text mb-0.5  leading-tight">
            {product?.productName}
          </h1>
          {/* Product Description */}
          {product?.productDesc && (
            <div className="mb-3 ml-1">
              <p className="text-gray-600 leading-relaxed">
                {product.productDesc}
              </p>
            </div>
          )}

          {/* Price Per Unit */}
          <p className="text-sm text-gray-500 mb-3">
            ${product?.productPrice / 10}/lb
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-4xl font-bold text-main-text">
              ${product?.productPrice}
            </span>
            <span className="text-xl text-gray-400 line-through">
              ${(Number(product?.productPrice) * 1.2).toFixed(2)}
            </span>
          </div>

          {/* Stock Badge */}
          <div className="inline-block mb-6 ">
            <span className="px-3 py-1.5 mr-3 bg-red-50 text-red-600 text-sm font-semibold rounded-lg border border-red-100">
              {product?.productLeftCount} Left
            </span>
            <span className="px-3 py-1.5 bg-main/30 text-main-text text-sm font-semibold rounded-lg border border-main">
              {product?.productViews} views
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => onAdd(createCartItem())}
            className="w-full bg-main hover:bg-main-dull text-main-text font-bold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 mb-8 border-2 border-main-dull"
          >
            <HugeiconsIcon icon={ShoppingCart02Icon} size={20} />
            Add To Cart
          </button>

          {/* About Product Section */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-main-text mb-4">
              About Product
            </h2>

            <div className="space-y-3">
              {/* Best Seller Badge */}
              {product?.productViews !== undefined && (
                <div
                  onClick={() => {
                    navigate("/");
                    scrollTo(0, 900);
                  }}
                  className="flex items-center justify-between p-4 bg-main/10 border border-main/30 rounded-xl hover:bg-main/15 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-main/30 rounded-full">
                      <HugeiconsIcon
                        icon={ChampionIcon}
                        size={20}
                        color="#e3b609"
                      />
                    </div>
                    <span className="font-semibold text-main-text">
                      Best Seller Product
                    </span>
                  </div>
                  <button className="text-main-dull hover:text-main-text font-semibold text-sm flex items-center gap-1 transition-colors">
                    View More
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {/* Satisfaction Guarantee */}
              {product?.productStatus && (
                <div className="flex items-center gap-3 p-4 rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                    <HugeiconsIcon
                      icon={CheckmarkBadge02Icon}
                      size={20}
                      color="#16a34a"
                    />
                  </div>
                  <span className="font-semibold text-main-text">
                    100% satisfaction guarantee
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
