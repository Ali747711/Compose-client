import {
  Delete02Icon,
  GiftIcon,
  ShoppingCart02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Divider from "../divider";
import { useGlobals } from "../../hooks/useGlobal";
import { CartItem } from "../../../libs/data/types/search";
import { useNavigate } from "react-router-dom";

const Basket = () => {
  const navigate = useNavigate();
  const { onAdd, onRemove, cartItems, getItemQuantity, currency } =
    useGlobals();

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item: CartItem) =>
      sum + (item?.price ?? 0) * getItemQuantity(item._id),
    0,
  );

  // Free delivery threshold
  const freeDeliveryThreshold = 10000;
  const savingsAmount = 2550;
  const remainingForFreeDelivery = Math.max(
    0,
    freeDeliveryThreshold - subtotal,
  );
  const progress = Math.min((subtotal / freeDeliveryThreshold) * 100, 100);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="hidden shadow-2xl md:flex flex-col absolute top-20 right-0 w-96 bg-white rounded-2xl  overflow-hidden"
    >
      {cartItems.length !== 0 ? (
        <div className="flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">My Cart</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {cartItems.length} Items
            </p>
          </div>

          {/* Cart Items - Scrollable after 3 items */}
          <div className="overflow-y-auto px-6 py-4 space-y-4 max-h-[300px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {cartItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                {/* Product Image */}
                <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-base font-bold text-main-dull">
                      {item.price}
                      {currency}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {(item.price ?? 0) * 1.5}
                      {currency}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {/* Delete Button */}
                  <button
                    onClick={() => onRemove(item)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <HugeiconsIcon
                      icon={Delete02Icon}
                      size={18}
                      color="#9ca3af"
                    />
                  </button>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 w-4 text-center">
                      {getItemQuantity(item._id)}
                    </span>
                    <button
                      onClick={() => onAdd(item)}
                      className="p-0 m-0 w-6 text-white bg-main hover:bg-main-dull rounded-full transition-colors"
                      aria-label="Add one more"
                    >
                      +
                      {/* <HugeiconsIcon
                        icon={AddCircleIcon}
                        size={28}
                        fill="currentColor"
                        className="text-main hover:text-main-dull"
                      /> */}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Free Delivery Banner */}
          {remainingForFreeDelivery > 0 ? (
            <div className="px-6 py-3 bg-main/10 border-t border-main/20">
              <p className="text-xs font-medium text-gray-700">
                Free delivery + saving {savingsAmount.toFixed(2)}
                {currency} on this order Go to checkout{" "}
                <span className="font-bold text-main-dull">
                  {remainingForFreeDelivery.toFixed(2)}
                  {currency}
                </span>
              </p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-main-dull to-main h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="px-6 py-3 bg-main/10 border-t border-main/20">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={GiftIcon} fill="#fdd22c" />
                <p className="text-xs font-medium text-gray-700 ">
                  You've unlocked free delivery! Saving {currency}
                  {savingsAmount.toFixed(2)}
                </p>
              </div>
              <div className="mt-2 w-full bg-main rounded-full h-1.5" />
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 space-y-3">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">
                {subtotal.toFixed(2)}
                {currency}
              </span>
            </div>

            {/* View Cart Button */}
            <button
              onClick={() => {
                navigate("/cart");
                scrollTo(0, 0);
              }}
              className="w-full bg-main hover:bg-main-dull text-gray-900 font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-98 flex items-center justify-center gap-2"
            >
              <HugeiconsIcon icon={ShoppingCart02Icon} size={20} />
              View cart
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">My Cart</h2>
          <Divider width="100%" height="5px" backgroundColor="#e5e7eb" />

          <div className="mt-12 mb-8 flex flex-col justify-center items-center">
            <div className="flex justify-center items-center rounded-full h-28 w-28 bg-main/20 mb-5 hover:scale-105 transition-transform">
              <HugeiconsIcon
                icon={ShoppingCart02Icon}
                size={40}
                color="#e3b609"
              />
            </div>
            <p className="font-semibold text-gray-900 text-lg">
              Your cart is hungry
            </p>
            <p className="font-normal text-sm text-gray-500 text-center mt-2">
              Fill your cart with our super delicious products!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
