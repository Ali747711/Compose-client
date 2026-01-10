import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingCart02Icon,
  Delete02Icon,
  Calendar03Icon,
  Location04Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { useGlobals } from "../../hooks/useGlobal";
import ProductCard from "../../components/ProductCard";
import { useState } from "react";
import { Product } from "../../../libs/data/types/product";
import { useSelector } from "react-redux";
import { retrieveProducts } from "./selector";
import Swiped from "../../components/Swiper";

const Cart = () => {
  const products = useSelector(retrieveProducts);
  const { cartItems, onAdd, onRemove, getItemQuantity } = useGlobals();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock recommendations - replace with actual data
  const recommendations = [
    {
      _id: "1",
      productName: "Fresh Oranges",
      productPrice: 99.99,
      productImages: ["https://example.com/orange.jpg"],
      productLeftCount: 12,
      // ... other product fields
    },
    // Add more products
  ];

  // Calculate totals
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * getItemQuantity(item._id),
    0
  );
  const deliveryFee = itemsTotal > 50 ? 0 : 5.78;
  const subtotal = itemsTotal + deliveryFee;
  const freeDeliveryThreshold = 50;
  const savingsIfFreeDelivery = itemsTotal >= freeDeliveryThreshold ? 5.78 : 0;
  const recomProducts: Product[] = products?.slice(0, 13);
  if (cartItems.length === 0) {
    return (
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-main-text mb-2">My Cart</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm">
          <div className="flex items-center justify-center w-28 h-28 bg-main/10 rounded-full mb-6">
            <HugeiconsIcon
              icon={ShoppingCart02Icon}
              size={50}
              color="#e3b609"
            />
          </div>
          <h2 className="text-2xl font-bold text-main-text mb-2">
            Your cart is hungry
          </h2>
          <p className="text-gray-500 mb-8">You don't have any items added</p>
          <button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold px-8 py-3.5 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
            <HugeiconsIcon icon={ShoppingCart02Icon} size={20} />
            Start Shopping
          </button>
        </div>

        {/* Best Seller Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-main-text">Best Seller</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg border border-gray-300 hover:border-main hover:bg-main/5 transition-all">
                <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
              </button>
              <button className="p-2 rounded-lg border border-gray-300 hover:border-main hover:bg-main/5 transition-all">
                <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {recomProducts.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        {/* Left Side - Cart Items */}
        <div className="lg:col-span-2">
          {/* Header with Location and Date */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-main/10 rounded-lg">
                  <HugeiconsIcon
                    icon={ShoppingCart02Icon}
                    size={24}
                    color="#e3b609"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-main-text">
                    Local Market
                  </h1>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <HugeiconsIcon icon={Location04Icon} size={16} />
                    <span>Shopping in 07114</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-main transition-all">
                <HugeiconsIcon icon={Calendar03Icon} size={18} />
                <span className="font-medium">Wed 1/23</span>
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Free Delivery Progress */}
            {itemsTotal < freeDeliveryThreshold && (
              <div className="mt-4 p-3 bg-main/10 border border-main/20 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  Free delivery + saving ${savingsIfFreeDelivery.toFixed(2)} on
                  this order Go to{" "}
                  <span className="font-bold">
                    ${(freeDeliveryThreshold - itemsTotal).toFixed(2)}
                  </span>
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-main-dull to-main h-2 rounded-full transition-all"
                    style={{
                      width: `${(itemsTotal / freeDeliveryThreshold) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-main-text mb-4">
              Items Name
            </h2>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-b-0"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-main-text truncate">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-main-dull">
                        ${item?.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${(item?.price * 1.3).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onRemove(item)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <HugeiconsIcon
                        icon={Delete02Icon}
                        size={18}
                        color="#9ca3af"
                      />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5">
                      <button
                        onClick={() => onRemove(item)}
                        className="text-gray-600 hover:text-main-text font-bold"
                      >
                        −
                      </button>
                      <span className="font-semibold text-main-text w-8 text-center">
                        {getItemQuantity(item._id)}
                      </span>
                      <button
                        onClick={() => onAdd(item)}
                        className="w-6 h-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full flex items-center justify-center font-bold hover:from-purple-700 hover:to-purple-600 transition-all"
                      >
                        +
                      </button>
                    </div>
                    <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                      Remove
                    </button>
                    <span className="font-bold text-main-text">
                      ${(item?.price * getItemQuantity(item._id)).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
            <h2 className="text-xl font-bold text-main-text mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items total</span>
                <span className="font-medium">${itemsTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery fee</span>
                <span className="font-medium">
                  ${deliveryFee === 0 ? "Free" : deliveryFee.toFixed(2)}
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-main-text">
                    Subtotal
                  </span>
                  <span className="text-2xl font-bold text-main-text">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              <HugeiconsIcon icon={ShoppingCart02Icon} size={20} />
              Checkout - ${subtotal.toFixed(2)}
            </button>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="px-8 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-main-text">Recommendations</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-gray-300 hover:border-main hover:bg-main/5 transition-all">
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
            </button>
            <button className="p-2 rounded-lg border border-gray-300 hover:border-main hover:bg-main/5 transition-all">
              <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
            </button>
          </div>
        </div>
        <div className="flex gap-6">
          {/* {recomProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))} */}
          <Swiped products={recomProducts} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
