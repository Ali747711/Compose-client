import { HugeiconsIcon } from "@hugeicons/react";
import { useGlobals } from "../../hooks/useGlobal";
import {
  Location01Icon,
  ShoppingBasket01Icon,
  Delete02Icon,
  Calendar03Icon,
  ShoppingCart02Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { DatePicker } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ProductService from "../../services/product.service";
import { setCartProducts } from "./slice";
import { Product } from "../../../libs/data/types/product";
import Swiped from "../../components/Swiper";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recomPros, setRecomPros] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading] = useState<string | null>(null);

  const {
    cartItems,
    currency,
    onAdd,
    onRemove,
    onDelete,
    deliveryDate,
    setDeliveryDate,
    getItemQuantity,
  } = useGlobals();

  // Fetch products
  const fetchCartPros = async () => {
    const productService = new ProductService();
    setLoading(true);
    productService
      .getAllProducts()
      .then((data) => {
        dispatch(setCartProducts(data));
        setRecomPros(data.slice(5, 15));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    (async () => {
      await fetchCartPros();
    })();
  }, [dispatch]);

  // Calculate totals
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + (item?.price ?? 0) * getItemQuantity(item._id),
    0
  );
  const deliveryFee = itemsTotal > 25000 ? 0 : 5000;
  const subtotal = itemsTotal + deliveryFee;
  const freeDeliveryThreshold = 25000;
  const savingsIfFreeDelivery = itemsTotal >= freeDeliveryThreshold ? 5000 : 0;

  // Loading State
  if (loading) {
    return (
      <div className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-main mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (cartItems.length === 0) {
    return (
      <div className="flex-1 min-h-screen bg-white lg:bg-gray-50">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 bg-white   px-3 py-4 flex items-center gap-4 z-10">
          <button onClick={() => navigate(-1)} className="p-1">
            <HugeiconsIcon icon={Cancel01Icon} size={24} />
          </button>
          <h1 className="text-xl font-bold text-main-text">My Cart</h1>
        </div>

        <div className="p-3 lg:p-5 max-w-7xl mx-auto">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <h1 className="text-3xl font-bold text-main-text mb-2">My Cart</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-12 lg:py-20 bg-white lg:rounded-2xl lg:shadow-sm">
            <div className="flex items-center justify-center w-20 h-20 lg:w-28 lg:h-28 bg-main/10 rounded-full mb-6">
              <HugeiconsIcon
                icon={ShoppingCart02Icon}
                size={40}
                className="lg:w-12 lg:h-12"
                color="#e3b609"
              />
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-main-text mb-2">
              Your cart is hungry
            </h2>
            <p className="text-gray-500 text-sm lg:text-base mb-6 lg:mb-8">
              You don't have any items added
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-main hover:bg-main-dull text-main-text font-bold px-6 lg:px-8 py-3 lg:py-3.5 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-main-dull"
            >
              <HugeiconsIcon icon={ShoppingCart02Icon} size={20} />
              Start Shopping
            </button>
          </div>

          {/* Best Seller Section */}
          {recomPros.length > 0 && (
            <div className="mt-8 lg:mt-12">
              <div className="mb-4 lg:mb-6">
                <h2 className="text-xl lg:text-3xl font-bold text-main-text mb-2">
                  Best Seller
                </h2>
                <div className="w-16 lg:w-20 h-0.5 lg:h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
              </div>
              <Swiped products={recomPros} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Cart with Items
  return (
    <div className="flex-1 min-h-screen bg-white lg:bg-black/1 ">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 bg-white z-20 border-b border-gray-350 shadow-sm hover:shadow-lg">
        <div className="px-3 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-1">
            <HugeiconsIcon icon={Cancel01Icon} size={24} />
          </button>
          <h1 className="text-xl font-bold text-main-text">My Cart</h1>
        </div>
        {itemsTotal < freeDeliveryThreshold && (
          <div className="px-3 pb-3">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-gradient-to-r from-main-dull to-main h-1 rounded-full transition-all"
                style={{
                  width: `${Math.min(
                    (itemsTotal / freeDeliveryThreshold) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:p-5 lg:max-w-7xl lg:mx-auto">
        {/* Left Side - Cart Items */}
        <div className="lg:col-span-2">
          {/* Desktop Header */}
          <div className="hidden lg:block bg-white border border-gray-200 rounded-2xl shadow-sm p-5 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-main/10 rounded-lg">
                  <HugeiconsIcon
                    icon={ShoppingBasket01Icon}
                    size={24}
                    color="#e3b609"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-main-text">
                    Local Market
                  </h1>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <HugeiconsIcon icon={Location01Icon} size={16} />
                    <span>Shopping in 07114</span>
                  </div>
                </div>
              </div>
              <div>
                <DatePicker
                  value={deliveryDate}
                  onChange={setDeliveryDate}
                  color="warning"
                  showMonthAndYearPickers
                  radius="md"
                  label="Delivery date"
                />
              </div>
            </div>

            {itemsTotal < freeDeliveryThreshold && (
              <div className="mt-4 p-3 bg-main/10 border border-main/20 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  Free delivery + saving {savingsIfFreeDelivery}
                  {currency} on this order Go to{" "}
                  <span className="font-bold">
                    {(freeDeliveryThreshold - itemsTotal).toFixed(2)}
                    {currency}
                  </span>
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-main-dull to-main h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        (itemsTotal / freeDeliveryThreshold) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mobile: Order Summary at Top */}
          <div className="lg:hidden p-3 bg-white border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Location01Icon}
                  size={20}
                  color="#e3b609"
                />
                <div>
                  <h2 className="text-base font-bold text-main-text">
                    Local Market
                  </h2>
                  <p className="text-xs text-gray-500">Shopping in 07114</p>
                </div>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
                <HugeiconsIcon icon={Calendar03Icon} size={16} />
                <span className="font-medium">Wed 1/23</span>
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Items total</span>
                <span className="font-medium">
                  {itemsTotal.toLocaleString()}
                  {currency}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery fee</span>
                <span className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-bold">FREE</span>
                  ) : (
                    `${deliveryFee.toLocaleString()}${currency}`
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between">
                <span className="font-semibold text-main-text">Subtotal</span>
                <span className="font-bold text-main-text text-lg">
                  {subtotal.toLocaleString()}
                  {currency}
                </span>
              </div>
            </div>
          </div>

          {/* Cart Items - Scrollable after 4 items */}
          <div className="bg-white rounded-2xl shadow-md p-3 lg:p-5">
            <h2 className="text-base lg:text-lg font-semibold text-main-text mb-4">
              Items Name
            </h2>
            {/* Scrollable container - max height for ~4 items */}
            <div className="space-y-4 max-h-90 md:h-125 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-main/50 rounded-2xl">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="pb-4 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex justify-between">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-main-text text-sm lg:text-base line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-base lg:text-lg font-bold text-main-dull">
                            {item?.price?.toLocaleString()}
                            {currency}
                          </span>
                          <span className="text-xs lg:text-sm text-gray-400 line-through">
                            {((item?.price ?? 0) * 1.3).toLocaleString()}
                            {currency}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex lg:flex items-center gap-3 mt-3">
                      <button
                        onClick={() => onDelete(item)}
                        disabled={actionLoading === `delete-${item._id}`}
                        className="hidden md:flex p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {actionLoading === `delete-${item._id}` ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-main"></div>
                        ) : (
                          <HugeiconsIcon
                            icon={Delete02Icon}
                            size={18}
                            color="#9ca3af"
                          />
                        )}
                      </button>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5">
                        <button
                          onClick={() => onRemove(item)}
                          disabled={actionLoading === `remove-${item._id}`}
                          className="text-gray-600 hover:text-main-text font-bold disabled:opacity-50"
                        >
                          {actionLoading === `remove-${item._id}` ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-2 border-gray-300 border-t-main"></div>
                          ) : (
                            "−"
                          )}
                        </button>
                        <span className="font-semibold text-main-text w-8 text-center">
                          {getItemQuantity(item._id)}
                        </span>
                        <button
                          onClick={() => onAdd(item)}
                          disabled={actionLoading === `add-${item._id}`}
                          className="w-6 h-6 bg-main hover:bg-main-dull text-main-text rounded-full flex items-center justify-center font-bold transition-all disabled:opacity-50"
                        >
                          {actionLoading === `add-${item._id}` ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-2 border-main-text border-t-transparent"></div>
                          ) : (
                            "+"
                          )}
                        </button>
                      </div>
                      <button
                        onClick={() => onDelete(item)}
                        disabled={actionLoading === `delete-${item._id}`}
                        className="hidden md:flex text-main-dull hover:text-main-text font-medium text-sm disabled:opacity-50"
                      >
                        {actionLoading === `delete-${item._id}` ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-main-dull border-t-main"></div>
                        ) : (
                          "Remove"
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div></div>
                    <div className="ml-auto font-bold text-main-text">
                      <span className="font-light">Item total: </span>{" "}
                      {(
                        (item?.price ?? 0) * getItemQuantity(item._id)
                      ).toLocaleString()}
                      {currency}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Right Side - Order Summary */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-5 sticky top-25">
            <h2 className="text-xl font-bold text-main-text mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items total</span>
                <span className="font-medium">
                  {itemsTotal.toLocaleString()}
                  {currency}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery fee</span>
                <span className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-bold">FREE</span>
                  ) : (
                    `${deliveryFee.toLocaleString()}${currency}`
                  )}
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-main-text">
                    Subtotal
                  </span>
                  <span className="text-2xl font-bold text-main-text">
                    {subtotal.toLocaleString()}
                    {currency}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-main hover:bg-main-dull text-main-text font-bold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 border-2 border-main-dull"
            >
              <HugeiconsIcon icon={ShoppingCart02Icon} size={20} />
              Checkout - {subtotal.toLocaleString()}
              {currency}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: Sticky Bottom Checkout Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-20">
        <button
          onClick={() => navigate("/checkout")}
          className="w-full bg-main hover:bg-main-dull text-main-text font-bold py-4 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2 border-2 border-main-dull"
        >
          <HugeiconsIcon icon={ShoppingCart02Icon} size={20} />
          Checkout - {subtotal.toLocaleString()}
          {currency}
        </button>
      </div>

      {/* Recommendations Section */}
      {recomPros.length > 0 && (
        <div className="p-3 lg:p-5 pb-25 lg:pb-8 lg:max-w-7xl lg:mx-auto">
          <div className="mb-4 lg:mb-6">
            <h2 className="text-xl lg:text-3xl font-bold text-main-text mb-2">
              Recommendations
            </h2>
            <div className="w-16 lg:w-20 h-0.5 lg:h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
          </div>
          <Swiped products={recomPros} />
        </div>
      )}
    </div>
  );
};

export default CartPage;
