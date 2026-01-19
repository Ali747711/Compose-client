import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Location01Icon,
  CreditCardIcon,
  InformationCircleIcon,
  Add01Icon,
  Calendar03Icon,
} from "@hugeicons/core-free-icons";
import PaymentService from "../../services/payment.service";
import { setAddresses, setPayments } from "./slice";
import { useGlobals } from "../../hooks/useGlobal";
import {
  retrieveCheckoutAddresses,
  retrieveCheckoutPayments,
} from "./selector";
import { Accordion, AccordionItem } from "@heroui/react";
import { Address } from "../../../libs/data/types/address";
import { Payment } from "../../../libs/data/types/payment";
import ProductService from "../../services/product.service";
import { Product } from "../../../libs/data/types/product";
import Swiped from "../../components/Swiper";
import OrderService from "../../services/order.service";
import { OrderInput } from "../../../libs/data/types/order";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paymentService = new PaymentService();
  const productService = new ProductService();
  const orderService = new OrderService();

  const {
    cartItems,
    currency,
    getItemQuantity,
    deliveryDate,
    authUser,
    setCartItems,
    selectedAddress,
    setSelectedAddress,
    addressData,
  } = useGlobals();

  // Local state
  const [loading, setLoading] = useState(true);
  const [recomProds, setRecomPros] = useState<Product[] | null>(null);
  // const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [processingCheckout, setProcessingCheckout] = useState(false);
  // Delivery tip state
  const [selectedTip, setSelectedTip] = useState<number>(0);
  const tipOptions = [5000, 10000, 15000, 20000, 30000];

  // Coupon state
  // const [couponCode, setCouponCode] = useState("");

  // Redux selectors (you'll need to add these)
  const addresses = useSelector(retrieveCheckoutAddresses);
  const payments = useSelector(retrieveCheckoutPayments);

  // Fetch data
  const getUserAddresses = async () => {
    try {
      // const data = await addressService.getUserAddresses();
      dispatch(setAddresses(addressData));
      // Auto-select default address
      // const defaultAddr = data.find((addr: Address) => addr.isDefault);
      // if (defaultAddr) setSelectedAddress(defaultAddr);
      // else {
      //   setSelectedAddress(data[0]);
      // }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const getPayments = async () => {
    try {
      const data = await paymentService.getPayments();
      dispatch(setPayments(data));
      // Auto-select default payment
      const defaultPay = data.find((pay: Payment) => pay.isDefault);
      if (defaultPay) setSelectedPayment(defaultPay);
      else {
        setSelectedPayment(data[0]);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const getProducts = async () => {
    try {
      await productService.getAllProducts().then((data) => {
        setRecomPros(data.slice(5, 15));
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getUserAddresses(), getPayments(), getProducts()]);
      setLoading(false);
    };
    fetchData();

    // // Auto-select first address and payment if available
    // if (addresses.length > 0) {
    //   setSelectedAddress(addresses.find((a) => a.isDefault) || addresses[0]);
    // }
    // if (payments.length > 0) {
    //   setSelectedPayment(payments.find((p) => p.isDefault) || payments[0]);
    // }
  }, [authUser]);

  // Calculate totals
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + (item?.price ?? 0) * getItemQuantity(item._id),
    0,
  );
  const deliveryFee = itemsTotal > 25000 ? 0 : 5000;
  const subtotal =
    cartItems.length > 0 ? itemsTotal + deliveryFee + selectedTip : 0;

  // Handle checkout
  const handleCheckout = async () => {
    if (!selectedAddress || !selectedPayment) {
      console.error("Address and payment method are required");
      return;
    }
    setProcessingCheckout(true);
    // Add your checkout logic here
    const input: OrderInput = {
      orderItemInput: cartItems,
      orderAddress: selectedAddress,
      orderPayment: selectedPayment,
      deliveryDate: deliveryDate
        ? `${deliveryDate?.year}-${deliveryDate?.month}-${deliveryDate?.day}`
        : new Date().toISOString().slice(0, 10),
      tip: selectedTip,
      deliveryFee,
    };
    await orderService.createOrder(input).then((data) => {
      // console.log("Order: ", data);

      setTimeout(() => {
        setProcessingCheckout(false);
        localStorage.removeItem("cartData");
        setCartItems([]);
        navigate(`/order/${data?._id}`);
      }, 2000);
    });
  };

  // Get card type from number
  const getCardType = (cardNumber: string) => {
    const firstDigit = cardNumber[0];
    if (firstDigit === "4") return "Visa";
    if (firstDigit === "5") return "Mastercard";
    if (firstDigit === "3") return "Amex";
    return "Card";
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-main mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start min-h-screen bg-white lg:bg-gray-50">
      <div>
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 bg-white z-20 border-b border-gray-200">
          <div className="px-3 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="p-1">
                <HugeiconsIcon icon={ArrowLeft01Icon} size={24} />
              </button>
              <h1 className="text-xl font-bold text-main-text">Cart</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <HugeiconsIcon icon={Calendar03Icon} size={16} />
              <span>
                {deliveryDate
                  ? `${deliveryDate.year}-${deliveryDate.month}-${deliveryDate.day}`
                  : `${new Date().toISOString().slice(0, 10)}`}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-3">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-main-text">Cart</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <HugeiconsIcon icon={Calendar03Icon} size={18} />
              <span className="font-medium">
                {deliveryDate
                  ? `${deliveryDate.year}-${deliveryDate.month}-${deliveryDate.day}`
                  : `${new Date().toISOString().slice(0, 10)}`}
              </span>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Left Side - Main Content */}
            <div className="lg:col-span-2 space-y-4">
              {/* Review Order - Dropdown with Product Images */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-4 md:p-5">
                <Accordion>
                  <AccordionItem
                    className="min-h-30 flex flex-col  justify-between"
                    key="1"
                    startContent={
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-main/10 rounded-lg">
                          <HugeiconsIcon
                            icon={Location01Icon}
                            size={20}
                            color="#e3b609"
                          />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-base lg:text-lg font-bold text-main-text">
                              Delivery Info
                            </h2>
                            <HugeiconsIcon
                              icon={InformationCircleIcon}
                              size={16}
                              color="#9ca3af"
                            />
                          </div>
                          {selectedAddress ? (
                            <p className="text-sm text-gray-600">
                              Deliver to:{" "}
                              <span className="text-main-dull font-medium">
                                {selectedAddress.street}, {selectedAddress.city}
                                , {selectedAddress.state}{" "}
                                {selectedAddress.zipcode}
                              </span>
                            </p>
                          ) : (
                            <p className="text-sm text-gray-500">
                              Select delivery address
                            </p>
                          )}
                        </div>
                      </div>
                    }
                  >
                    <div className="border-t border-gray-200 p-4 lg:p-5 ">
                      {addresses.length === 0 ? (
                        <div className="text-center py-6">
                          <p className="text-gray-500 mb-3">
                            No saved addresses
                          </p>
                          <button
                            onClick={() => navigate("/user/addresses")}
                            className="bg-main hover:bg-main-dull text-main-text font-semibold px-4 py-2 rounded-lg transition-all"
                          >
                            Add Address
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {addresses.map((address: Address) => (
                            <div
                              key={address._id}
                              onClick={() => {
                                setSelectedAddress(address);
                              }}
                              className={`border-2 rounded-xl p-3 cursor-pointer transition-all ${
                                selectedAddress?._id === address._id
                                  ? "border-main bg-main/5"
                                  : "border-gray-200 hover:border-main/50 bg-white"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <input
                                  type="radio"
                                  checked={selectedAddress?._id === address._id}
                                  onChange={() => setSelectedAddress(address)}
                                  className="mt-1 w-4 h-4 text-main border-gray-300 focus:ring-main cursor-pointer"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-main-text">
                                      {address.label}
                                    </h3>
                                    {address.isDefault && (
                                      <span className="px-2 py-0.5 bg-main/20 text-main-text text-xs font-semibold rounded">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {address.street}, {address.city}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {address.state}, {address.zipcode}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                          <button
                            onClick={() => navigate("/user/addresses")}
                            className="w-full py-2 text-main-dull hover:text-main-text font-medium text-sm flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-main transition-all"
                          >
                            <HugeiconsIcon icon={Add01Icon} size={18} />
                            Add New Address
                          </button>
                        </div>
                      )}
                    </div>
                  </AccordionItem>
                  <AccordionItem
                    key="2"
                    className="min-h-30 flex flex-col  justify-between"
                    startContent={
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-main/10 rounded-lg">
                          <HugeiconsIcon
                            icon={CreditCardIcon}
                            size={20}
                            color="#e3b609"
                          />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-base lg:text-lg font-bold text-main-text">
                              Payment Method
                            </h2>
                            <HugeiconsIcon
                              icon={InformationCircleIcon}
                              size={16}
                              color="#9ca3af"
                            />
                          </div>
                          {selectedPayment ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">
                                Pay with:
                              </span>
                              <div className="flex items-center gap-1">
                                <div className="w-5 h-5 bg-main/20 rounded flex items-center justify-center">
                                  <HugeiconsIcon
                                    icon={CreditCardIcon}
                                    size={12}
                                    color="#e3b609"
                                  />
                                </div>
                                <span className="text-sm text-main-dull font-medium">
                                  {getCardType(selectedPayment.cardNumber)} ••••{" "}
                                  {selectedPayment.cardNumber?.slice(-4)}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">
                              Select payment method
                            </p>
                          )}
                        </div>
                      </div>
                    }
                  >
                    <div className="border-t border-gray-200 p-4 lg:p-5 ">
                      {payments.length === 0 ? (
                        <div className="text-center py-6">
                          <p className="text-gray-500 mb-3">
                            No saved payment methods
                          </p>
                          <button
                            onClick={() => navigate("/user/payments")}
                            className="bg-main hover:bg-main-dull text-main-text font-semibold px-4 py-2 rounded-lg transition-all"
                          >
                            Add Payment Method
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {payments.map((payment: Payment) => (
                            <div
                              key={payment._id}
                              onClick={() => {
                                setSelectedPayment(payment);
                              }}
                              className={`border-2 rounded-xl p-3 cursor-pointer transition-all ${
                                selectedPayment?._id === payment._id
                                  ? "border-main bg-main/5"
                                  : "border-gray-200 hover:border-main/50 bg-white"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <input
                                  type="radio"
                                  checked={selectedPayment?._id === payment._id}
                                  onChange={() => setSelectedPayment(payment)}
                                  className="mt-1 w-4 h-4 text-main border-gray-300 focus:ring-main cursor-pointer"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-main-text">
                                      {getCardType(payment.cardNumber)}
                                    </h3>
                                    {payment.isDefault && (
                                      <span className="px-2 py-0.5 bg-main/20 text-main-text text-xs font-semibold rounded">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 font-mono">
                                    •••• •••• ••••{" "}
                                    {payment.cardNumber?.slice(-4)}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {payment.cardName}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                          <button
                            onClick={() => navigate("/user/payments")}
                            className="w-full py-2 text-main-dull hover:text-main-text font-medium text-sm flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-main transition-all"
                          >
                            <HugeiconsIcon icon={Add01Icon} size={18} />
                            Add New Payment
                          </button>
                        </div>
                      )}
                    </div>
                  </AccordionItem>

                  <AccordionItem
                    key="3"
                    className="min-h-30 flex flex-col  justify-between"
                    startContent={
                      <div className="flex flex-col items-start gap-3 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h2 className="text-base lg:text-lg font-bold text-main-text">
                            Review Order
                          </h2>
                          <HugeiconsIcon
                            icon={InformationCircleIcon}
                            size={16}
                            color="#9ca3af"
                          />
                        </div>
                        <div className="flex-1">
                          {/* Product Images Row */}
                          <div className="flex gap-2">
                            {cartItems.slice(0, 6).map((item, index) => (
                              <div
                                key={index}
                                className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden shrink-0"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                            {cartItems.length > 6 && (
                              <div className="w-10 h-10 bg-main/10 rounded-lg flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold text-main-text">
                                  +{cartItems.length - 6}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <div className="border-t border-gray-200 p-4 lg:p-5 ">
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {cartItems.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center gap-3 bg-white  p-3 border-b border-border"
                          >
                            <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-main-text text-sm line-clamp-1">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Qty: {getItemQuantity(item._id)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-main-text">
                                {(
                                  (item?.price ?? 0) * getItemQuantity(item._id)
                                ).toLocaleString()}
                                {currency}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Right Side - Order Summary (Desktop) */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-30">
                <h2 className="text-xl font-bold text-main-text mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery fee</span>
                    <span className="font-medium">
                      {deliveryFee.toLocaleString()}
                      {currency}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Items total</span>
                    <span className="font-medium">
                      {itemsTotal.toLocaleString()}
                      {currency}
                    </span>
                  </div>
                </div>

                {/* Delivery Tip */}
                <div className="mb-6">
                  <h3 className="font-semibold text-main-text mb-2 text-sm">
                    Delivery Tip
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">
                    Your delivery person keeps 100% of tips.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tipOptions.map((tip) => (
                      <button
                        key={tip}
                        onClick={() => setSelectedTip(tip)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          selectedTip === tip
                            ? "bg-main text-main-text border-2 border-main-dull"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {tip}
                        {currency}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coupon */}
                <div className="mb-6">
                  <button className="w-full flex items-center justify-between py-2 text-main-dull hover:text-main-text transition-colors">
                    <span className="font-medium text-sm">Coupon</span>
                    <div className="flex items-center gap-1">
                      <HugeiconsIcon icon={Add01Icon} size={16} />
                      <span className="text-sm">Add Coupon</span>
                    </div>
                  </button>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-gray-200 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-main-text">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-main-text">
                      {subtotal.toLocaleString()}
                      {currency}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    By placing this order, you are agreeing to Terms and
                    Conditions.
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={
                    !selectedAddress ||
                    !selectedPayment ||
                    processingCheckout ||
                    cartItems.length === 0
                  }
                  className="w-full bg-main hover:bg-main-dull text-main-text font-bold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border-2 border-main-dull disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {processingCheckout ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-main-text border-t-transparent"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Place Order</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Order Summary & Checkout */}
        <div className="lg:hidden bg-white border-t border-gray-200 p-3 pb-6">
          <div className="mb-4">
            <h3 className="font-bold text-main-text mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Delivery fee</span>
                <span className="font-medium">
                  {deliveryFee.toLocaleString()}
                  {currency}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Items total</span>
                <span className="font-medium">
                  {itemsTotal.toLocaleString()}
                  {currency}
                </span>
              </div>
            </div>

            {/* Delivery Tip */}
            <div className="mb-4">
              <h4 className="font-semibold text-main-text mb-2 text-sm">
                Delivery Tip
              </h4>
              <p className="text-xs text-gray-500 mb-2">
                Your delivery person keeps 100% of tips.
              </p>
              <div className="flex flex-wrap gap-2">
                {tipOptions.map((tip) => (
                  <button
                    key={tip}
                    onClick={() => setSelectedTip(tip)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedTip === tip
                        ? "bg-main text-main-text border-2 border-main-dull"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {tip}
                    {currency}
                  </button>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <button className="w-full flex items-center justify-between py-2 mb-4 text-main-dull hover:text-main-text">
              <span className="font-medium text-sm">Coupon</span>
              <div className="flex items-center gap-1">
                <HugeiconsIcon icon={Add01Icon} size={16} />
                <span className="text-sm">Add Coupon</span>
              </div>
            </button>

            <div className="pt-3 border-t border-gray-200 flex justify-between mb-4">
              <span className="font-bold text-main-text">Total</span>
              <span className="text-lg font-bold text-main-text">
                {subtotal.toLocaleString()}
                {currency}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              By placing this order, you are agreeing to Terms and Conditions.
            </p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={
              !selectedAddress ||
              !selectedPayment ||
              processingCheckout ||
              cartItems.length === 0
            }
            className="w-full bg-main hover:bg-main-dull text-main-text font-bold py-4 rounded-xl transition-all duration-200 shadow-lg border-2 border-main-dull disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {processingCheckout ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-main-text border-t-transparent"></div>
                <span>Processing...</span>
              </>
            ) : (
              <span>Place Order</span>
            )}
          </button>
        </div>
      </div>
      <div>
        {recomProds && (
          <div className="max-w-7xl mx-auto">
            <div className="mb-4 lg:mb-6">
              <h2 className="text-xl lg:text-3xl font-bold text-main-text mb-2">
                Recommendations
              </h2>
              <div className="w-16 lg:w-20 h-0.5 lg:h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
            </div>
            <Swiped products={recomProds} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
