import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  StarIcon,
  ShoppingCartCheck01Icon,
  ShoppingBasket01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import type { Product } from "../../libs/data/types/product";

interface CardProps {
  product: Product;
}

const ProductCard = (props: CardProps) => {
  const [count, setCount] = useState<number>(0);
  const { product } = props;

  return (
    <div className="mt-3 md:mt-10 border border-gray-200 rounded-xl md:px-5 px-4 py-3 bg-white min-w-72 max-w-90 w-full min-h-80 m-auto shadow-sm hover:shadow-lg hover:border-main/30 transition-all duration-300">
      {/* Image Container with Yellow Accent */}
      <div className="group cursor-pointer flex items-center justify-center px-2 py-3 bg-white rounded-lg mb-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img
          className="group-hover:scale-110 transition-transform duration-300 max-w-28 md:max-w-36 relative z-10"
          src={product.productImages[0]}
          alt={product.productName}
        />
      </div>

      {/* Product Info */}
      <div className="space-y-1.5">
        {/* Collection Badge */}
        <p className="text-main-dull text-xs font-semibold uppercase tracking-wide">
          {product.productCollection}
        </p>

        {/* Product Name */}
        <p className="text-gray-800 font-semibold text-lg truncate w-full leading-tight">
          {product.productName}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array(5)
            .fill("")
            .map((_, i) =>
              product.ratingsSummary.average > i ? (
                <HugeiconsIcon
                  key={i}
                  icon={StarIcon}
                  size={14}
                  color="#fdd22c"
                  fill="#fdd22c"
                />
              ) : (
                <HugeiconsIcon
                  key={i}
                  icon={StarIcon}
                  size={14}
                  color="#e5e7eb"
                />
              )
            )}
          <p className="text-sm text-gray-600 ml-1">
            ({product.ratingsSummary.average})
          </p>
        </div>

        {/* Stock and Views */}
        <div className="flex items-center gap-4 py-1.5 px-3 bg-gray-50 rounded-lg text-sm">
          <div className="flex gap-1.5 items-center text-gray-600">
            <HugeiconsIcon icon={ShoppingBasket01Icon} size={16} />
            <p className="font-medium">{product.productLeftCount}</p>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <div className="flex gap-1.5 items-center text-gray-600">
            <HugeiconsIcon icon={ViewIcon} size={16} />
            <p className="font-medium">{product.productViews}</p>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-end justify-between pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            <p className="md:text-2xl text-xl font-bold text-gray-900">
              {product.productPrice}W
            </p>
            <span className="text-gray-400 md:text-sm text-xs line-through">
              2000W
            </span>
          </div>

          {/* Add to Cart Button */}
          <div>
            {count === 0 ? (
              <button
                className="flex items-center justify-center gap-1.5 bg-main hover:bg-main-dull border-2 border-main hover:border-main-dull md:px-5 px-4 h-10 rounded-lg text-gray-900 font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                onClick={() => setCount(1)}
              >
                <HugeiconsIcon icon={ShoppingCartCheck01Icon} size={16} />
                <span className="md:inline hidden">Add</span>
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-24 w-20 h-10 bg-main border-2 border-main-dull rounded-lg select-none shadow-sm">
                <button
                  onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                  className="cursor-pointer text-lg font-bold px-2 h-full hover:bg-main-dull/20 rounded-l transition-colors"
                >
                  −
                </button>
                <span className="w-6 text-center font-semibold text-gray-900">
                  {count}
                </span>
                <button
                  onClick={() => setCount((prev) => prev + 1)}
                  className="cursor-pointer text-lg font-bold px-2 h-full hover:bg-main-dull/20 rounded-r transition-colors"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
