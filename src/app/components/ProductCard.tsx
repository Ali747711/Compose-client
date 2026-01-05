import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  StarIcon,
  ShoppingCartCheck01Icon,
  ShoppingBasket01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import type {
  ProductCollection,
  ProductSize,
  ProductStatus,
  ProductVolume,
} from "../../libs/enums/product.enum";
import type { RatingsSummary } from "../../libs/data/types/product";
interface Product {
  _id: string;
  productStatus: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize: ProductSize;
  productVolume: ProductVolume;
  productDesc: string;
  productImages: string[];
  productViews: number;
  ratingsSummary: RatingsSummary;
  createdAt: Date;
  updatedAt: Date;
}

interface CardProps {
  product: Product;
}
const ProductCard = (props: CardProps) => {
  const [count, setCount] = useState<number>(5);
  const { product } = props;

  return (
    <div className="mt-3 md:mt-10 border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-65 w-full min-h-80 m-auto">
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 transition max-w-26 md:max-w-36"
          src={product.productImages[0]}
          alt={product.productName}
        />
      </div>
      <div className="text-gray-500/60 text-sm">
        <p>{product.productCollection}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {product.productName}
        </p>
        <div className="flex items-center gap-0.5">
          {Array(5)
            .fill("")
            .map((_, i) =>
              product.ratingsSummary.average > i ? (
                <HugeiconsIcon
                  icon={StarIcon}
                  size={13}
                  color="#ffd700"
                  fill="#ffd700"
                />
              ) : (
                <HugeiconsIcon icon={StarIcon} size={13} />
              )
            )}
          <p>({product.ratingsSummary.average})</p>
        </div>
        <div className="flex justify-between mt-3 ">
          <div className="flex gap-1.5 justify-center items-center">
            <HugeiconsIcon icon={ShoppingBasket01Icon} />{" "}
            <p>{product.productLeftCount}</p>
          </div>
          <p>|</p>
          <div className="flex gap-1.5 justify-between items-center mr-3">
            <HugeiconsIcon icon={ViewIcon} /> <p>{product.productViews}</p>
          </div>
        </div>
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-main-text">
            {product.productPrice}W{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              2000W{/* ${product.price} */}
            </span>
          </p>
          <div className="text-main-text">
            {count === 0 ? (
              <button
                className="flex items-center justify-center gap-1 bg-main/20 border border-main md:w-20 w-16 h-8.5 rounded text-main-text font-medium"
                onClick={() => setCount(1)}
              >
                <HugeiconsIcon icon={ShoppingCartCheck01Icon} size={15} />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-8.5 bg-main/40 rounded select-none">
                <button
                  onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">{count}</span>
                <button
                  onClick={() => setCount((prev) => prev + 1)}
                  className="cursor-pointer text-md px-2 h-full"
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
