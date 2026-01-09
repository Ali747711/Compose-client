import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingCart02Icon,
  CheckmarkBadge02Icon,
  ChampionIcon,
} from "@hugeicons/core-free-icons";

const ProductHero = () => {
  const product = {
    name: "Nike Pegasus 41 Premium Running Shoes",
    category: "Sports",
    price: 189,
    offerPrice: 159,
    pricePerUnit: "$6.71/lb",
    stock: 12,
    rating: 4.7,
    images: [
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
    ],
    description: [
      "High-quality material",
      "Comfortable for everyday use",
      "Available in different sizes",
    ],
    isBestSeller: true,
    hasGuarantee: true,
  };

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <span className="hover:text-gray-700 cursor-pointer">Home</span>
        <span className="mx-2">/</span>
        <span className="hover:text-gray-700 cursor-pointer">Products</span>
        <span className="mx-2">/</span>
        <span className="hover:text-gray-700 cursor-pointer">
          {product.category}
        </span>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side - Images */}
        <div className="flex-1 max-w-2xl">
          {/* Main Image */}
          <div className="bg-gradient-to-br from-main/5 to-gray-50 rounded-2xl overflow-hidden mb-4 aspect-square flex items-center justify-center p-8 border border-gray-100">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-3">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-1 bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? "border-main-dull shadow-md scale-105"
                    : "border-transparent hover:border-main/30"
                }`}
              >
                <div className="aspect-square p-3 flex items-center justify-center">
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="flex-1 max-w-xl">
          {/* Product Name */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          {/* Price Per Unit */}
          <p className="text-sm text-gray-500 mb-2">{product.pricePerUnit}</p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-4xl font-bold text-gray-900">
              ${product.offerPrice}
            </span>
            <span className="text-xl text-gray-400 line-through">
              ${product.price}
            </span>
          </div>

          {/* Stock Badge */}
          <div className="inline-block mb-6">
            <span className="px-3 py-1.5 bg-red-50 text-red-600 text-sm font-semibold rounded-lg border border-red-100">
              {product.stock} Left
            </span>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-main hover:bg-main-dull text-gray-900 font-bold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 mb-8 border-2 border-main-dull">
            <HugeiconsIcon icon={ShoppingCart02Icon} size={20} />
            Add To Cart
          </button>

          {/* About Product Section */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              About Product
            </h2>

            <div className="space-y-3">
              {/* Best Seller Badge */}
              {product.isBestSeller && (
                <div className="flex items-center justify-between p-4 bg-main/10 border border-main/30 rounded-xl hover:bg-main/15 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-main/30 rounded-full">
                      <HugeiconsIcon
                        icon={ChampionIcon}
                        size={20}
                        color="#e3b609"
                      />
                    </div>
                    <span className="font-semibold text-gray-900">
                      Best Seller Product
                    </span>
                  </div>
                  <button className="text-main-dull hover:text-gray-900 font-semibold text-sm flex items-center gap-1 transition-colors">
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
              {product.hasGuarantee && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                    <HugeiconsIcon
                      icon={CheckmarkBadge02Icon}
                      size={20}
                      color="#16a34a"
                    />
                  </div>
                  <span className="font-semibold text-gray-900">
                    100% satisfaction guarantee
                  </span>
                </div>
              )}
            </div>

            {/* Product Description */}
            <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <ul className="space-y-2.5 text-gray-700">
                {product.description.map((desc, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-main-dull text-lg font-bold mt-0.5">
                      •
                    </span>
                    <span className="font-medium">{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
