import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  HelpCircleIcon,
  CheckmarkCircle01Icon,
  Location01Icon,
  CreditCardIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import OrderService from "../../services/order.service";
import { useGlobals } from "../../hooks/useGlobal";
import { Order, OrderUpdateInput } from "../../../libs/data/types/order";
import { OrderStatus } from "../../../libs/enums/order.enum";

import { Address } from "../../../libs/data/types/address";
import { Payment } from "../../../libs/data/types/payment";

const OrderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currency } = useGlobals();

  const [order, setOrder] = useState<Order | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const orderService = new OrderService();
        const data = await orderService.getOrder(id);
        setOrder(data);
        setAddress(
          Array.isArray(data?.orderAddress) ? data.orderAddress[0] : null
        );
        setPayment(
          Array.isArray(data?.orderPayment) ? data.orderPayment[0] : null
        );
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  // Get order status details
  const getOrderStatusInfo = () => {
    switch (order?.orderStatus) {
      case OrderStatus.PAUSE:
        return {
          label: "In Progress",
          color: "bg-main/25 text-main-text",
          stage: 1,
        };
      case OrderStatus.PROCESS:
        return {
          label: "Processing",
          color: "bg-main/50 text-main-text",
          stage: 2,
        };
      case OrderStatus.FINISH:
        return {
          label: "Completed",
          color: "bg-green-100 text-green-700",
          stage: 3,
        };
      default:
        return {
          label: "Unknown",
          color: "bg-gray-100 text-gray-700",
          stage: 0,
        };
    }
  };

  const statusInfo = getOrderStatusInfo();

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(date));
  };
  const formatHour = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(date));
  };

  // Calculate pagination
  // const totalPages = Math.ceil((order?.orderItems.length ?? 0) / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentItems = order?.orderItems.slice(startIndex, endIndex);

  // Handle confirm payment (move to PROCESS)
  const handleConfirmPayment = async () => {
    setActionLoading(true);
    try {
      const orderService = new OrderService();
      const input: OrderUpdateInput = {
        orderId: id as string,
        orderStatus: OrderStatus.PROCESS,
      };
      await orderService.updateOrder(input);
      if (order) {
        setOrder({
          ...order,
          orderStatus: OrderStatus.PROCESS,
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle confirm delivery (move to FINISH)
  const handleConfirmDelivery = async () => {
    setActionLoading(true);
    try {
      const orderService = new OrderService();
      const input: OrderUpdateInput = {
        orderId: id as string,
        orderStatus: OrderStatus.FINISH,
      };
      await orderService.updateOrder(input);
      if (order) {
        setOrder({
          ...order,
          orderStatus: OrderStatus.FINISH,
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.error("Error confirming delivery:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle cancel order
  const handleCancelOrder = async () => {
    if (
      window.confirm(
        "Are you sure you want to cancel this order? This action cannot be undone."
      )
    ) {
      setActionLoading(true);
      try {
        const orderService = new OrderService();
        const input: OrderUpdateInput = {
          orderId: id as string,
          orderStatus: OrderStatus.DELETE,
        };
        await orderService.updateOrder(input);
        navigate("/user/orders");
      } catch (error) {
        console.error("Error canceling order:", error);
      } finally {
        setActionLoading(false);
      }
    }
  };

  // Calculate total cost:
  const total =
    (order?.deliveryFee ?? 0) + (order?.tip ?? 0) + (order?.orderTotal ?? 0);

  // Address
  const addressString = address
    ? `${address?.zipcode}, ${address?.street}, ${address?.city}, ${address?.state}, ${address?.country}`
    : "46296, Soyeong-ro 39, Busan, Busan, South Korea";

  // Get card type from card number
  const getCardType = (cardNumber: string) => {
    const firstDigit = cardNumber.replace(/\s/g, "")[0];
    if (firstDigit === "4") return "Visa";
    if (firstDigit === "5") return "Mastercard";
    if (firstDigit === "3") return "Amex";
    return "Card";
  };

  // Mask card number
  const maskCardNumber = (cardNumber: string) => {
    const digits = cardNumber.replace(/\s/g, "");
    return `•••• •••• •••• ${digits.slice(-4)}`;
  };
  // Loading state
  if (loading) {
    return (
      <div className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-main mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-white lg:bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 bg-white z-20 border-b border-gray-200">
        <div className="px-3 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1">
              <HugeiconsIcon icon={Cancel01Icon} size={24} />
            </button>
            <h1 className="text-xl font-bold text-main-text">Order Details</h1>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
            <HugeiconsIcon icon={HelpCircleIcon} size={18} />
            Help
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-3 lg:p-5">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-main-text transition-colors"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={24} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-main transition-all">
            <HugeiconsIcon icon={HelpCircleIcon} size={18} />
            <span className="font-medium">Help</span>
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Side - Order Progress & Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Header */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-main-text mb-1">
                    Order In Progress
                  </h1>
                  <p className="text-sm text-gray-500">
                    Order Arrived at Eco, {order && formatDate(order.createdAt)}
                  </p>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold ${statusInfo.color}`}
                >
                  {statusInfo.label}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200">
                  <div
                    className="bg-main-dull transition-all duration-500"
                    style={{
                      height: `${((statusInfo.stage - 1) / 2) * 100}%`,
                    }}
                  />
                </div>

                {/* Progress Steps */}
                <div className="space-y-8 relative">
                  {/* Step 1: Order Placed */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        statusInfo.stage >= 1 ? "bg-main" : "bg-gray-200"
                      }`}
                    >
                      <HugeiconsIcon
                        icon={CheckmarkCircle01Icon}
                        size={20}
                        color="white"
                      />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-bold text-main-text">
                        Order is Placed
                      </h3>
                      <p className="text-sm text-gray-500">
                        {order && formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Step 2: Order Processing */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        statusInfo.stage >= 2 ? "bg-main" : "bg-gray-200"
                      }`}
                    >
                      <HugeiconsIcon
                        icon={CheckmarkCircle01Icon}
                        size={20}
                        color="white"
                      />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3
                        className={`font-bold ${
                          statusInfo.stage >= 2
                            ? "text-main-text"
                            : "text-gray-400"
                        }`}
                      >
                        Order Arrived {address?.street}, at{" "}
                        {order && formatHour(order?.updatedAt)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {order && formatDate(order.updatedAt)}
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Order Completed */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        statusInfo.stage >= 3 ? "bg-main" : "bg-gray-200"
                      }`}
                    >
                      <HugeiconsIcon
                        icon={CheckmarkCircle01Icon}
                        size={20}
                        color="white"
                      />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3
                        className={`font-bold ${
                          statusInfo.stage >= 3
                            ? "text-main-text"
                            : "text-gray-400"
                        }`}
                      >
                        Order Delivered
                      </h3>
                      <p className="text-sm text-gray-500">
                        {order && formatDate(order.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h2 className="text-lg font-bold text-main-text mb-4">
                Items Name
              </h2>

              {/* Items List */}
              <div className="space-y-4 mb-6">
                {order?.orderItems?.map((item) => {
                  const product = order?.productData.find(
                    (p) => p._id === item.productId
                  );
                  return (
                    <div
                      key={item._id}
                      className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center gap-4">
                        {/* Product Image */}
                        <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={product?.productImages[0]}
                            alt={product?.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div>
                          <h3 className="font-medium text-main-text">
                            {product?.productName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-base font-bold text-main-text">
                              {currency}
                              {item.itemPrice.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              {currency}
                              {((item.itemPrice ?? 0) * 1.5).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="text-right">
                        <span className="font-semibold text-main-text">
                          {item.itemQuantity}x
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cancel Order Notice & Button */}
            {order?.orderStatus !== OrderStatus.FINISH && (
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <p className="text-sm text-gray-600 mb-4">
                  You can cancel your order before it starts being prepared.
                </p>
                <button
                  onClick={handleCancelOrder}
                  disabled={actionLoading}
                  className="w-full py-3 border-2 border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 font-semibold rounded-xl transition-all disabled:opacity-50"
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">
              <h2 className="text-xl font-bold text-main-text mb-6">
                Order Summary
              </h2>

              {/* Order Number */}
              <div className="flex items-center gap-2 pb-4  border-gray-100">
                <span className="text-sm text-gray-600">Order Number:</span>
                <span className="text-sm font-bold text-purple-600">
                  {order?._id}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <span className="text-sm text-gray-600">Delivery date:</span>
                <span className="text-sm font-bold text-main-text">
                  {order?.deliveryDate}
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fees:</span>
                  <span className="font-medium">
                    {order?.deliveryFee}
                    {currency}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tip:</span>
                  <span className="font-medium">
                    {order?.tip}
                    {currency}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Item total:</span>
                  <span className="font-medium">
                    {order?.orderTotal}
                    {currency}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-main-text">Total</span>
                    <span className="text-2xl font-bold text-main-text">
                      {total}
                      {currency}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-4 pb-4 border-b border-gray-100">
                <h3 className="text-sm font-bold text-main-text mb-2">
                  Pay With
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-main/20 rounded flex items-center justify-center">
                    <HugeiconsIcon
                      icon={CreditCardIcon}
                      size={16}
                      color="#e3b609"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {getCardType(payment?.cardNumber as string)}{" "}
                    {maskCardNumber(payment?.cardNumber as string)}
                  </span>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-main-text mb-2">
                  Delivery Address
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-main/20 rounded flex items-center justify-center">
                    <HugeiconsIcon
                      icon={Location01Icon}
                      size={16}
                      color="#e3b609"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {addressString}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              {order?.orderStatus === OrderStatus.PAUSE && (
                <button
                  onClick={handleConfirmPayment}
                  disabled={actionLoading}
                  className="w-full bg-main hover:bg-main-dull text-main-text font-bold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border-2 border-main-dull disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {actionLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-main-text border-t-transparent"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    "Confirm Payment"
                  )}
                </button>
              )}

              {order?.orderStatus === OrderStatus.PROCESS && (
                <button
                  onClick={handleConfirmDelivery}
                  disabled={actionLoading}
                  className="w-full bg-main hover:bg-main-dull text-main-text font-bold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border-2 border-main-dull disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {actionLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-main-text border-t-transparent"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    "Confirm Delivery"
                  )}
                </button>
              )}

              {order?.orderStatus === OrderStatus.FINISH && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={24}
                      color="#22c55e"
                    />
                  </div>
                  <p className="font-bold text-green-700">Order Completed!</p>
                  <p className="text-sm text-green-600 mt-1">
                    Thank you for your order
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
