import { createSelector } from "@reduxjs/toolkit";
import { useState } from "react";
import {
  retrieveAllOrders,
  retrieveCancelOrders,
  retrieveFinishOrders,
  retrievePauseOrders,
  retrieveProcessOrders,
} from "./selector";
import { useSelector } from "react-redux";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CreditCardPosIcon,
  Link01Icon,
  NoteDoneIcon,
  ShoppingCart01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { useGlobals } from "../../hooks/useGlobal";
import { NavLink, useNavigate } from "react-router-dom";
import { Order } from "../../../libs/data/types/order";

const retrieveAllData = createSelector(
  retrieveAllOrders,
  retrievePauseOrders,
  retrieveProcessOrders,
  retrieveFinishOrders,
  retrieveCancelOrders,
  (allOrders, pauseOrders, processOrders, finishOrders, cancelOrders) => ({
    allOrders,
    pauseOrders,
    processOrders,
    finishOrders,
    cancelOrders,
  }),
);

type OrderStatus = "all" | "inProgress" | "delivered" | "cancelled";

// Tab button component - moved outside main component
const TabButton = ({
  label,
  value,
  isActive,
  onClick,
}: {
  label: string;
  value: OrderStatus;
  isActive: boolean;
  onClick: (value: OrderStatus) => void;
}) => (
  <button
    onClick={() => onClick(value)}
    className={`px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg font-medium transition-all duration-200 text-sm lg:text-base whitespace-nowrap ${
      isActive
        ? "bg-main text-main-text shadow-sm"
        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
    }`}
  >
    {label}
  </button>
);

// Empty state component - moved outside main component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 lg:py-20 px-4 bg-white lg:rounded-2xl lg:shadow-sm">
    <div className="w-20 h-20 lg:w-28 lg:h-28 mb-6 flex items-center justify-center bg-main/10 rounded-full">
      <HugeiconsIcon
        icon={ShoppingCart01Icon}
        size={48}
        className="lg:w-16 lg:h-16"
        color="#e3b609"
      />
    </div>
    <h3 className="text-xl lg:text-2xl font-bold text-main-text mb-2">
      You Don't Have any order yet
    </h3>
    <p className="text-gray-500 text-sm lg:text-base mb-6 lg:mb-8">
      Explore and place your first order now!
    </p>
    <NavLink
      to="/products"
      className="px-6 lg:px-8 py-3 lg:py-3.5 bg-main hover:bg-main-dull text-main-text font-bold rounded-xl transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg border-2 border-main-dull"
    >
      <HugeiconsIcon icon={ShoppingCart01Icon} size={20} />
      Start Shopping
    </NavLink>
  </div>
);

const UserOrders = () => {
  const navigate = useNavigate();
  const { currency } = useGlobals();
  const { allOrders, pauseOrders, processOrders, finishOrders, cancelOrders } =
    useSelector(retrieveAllData);

  const [activeTab, setActiveTab] = useState<OrderStatus>("all");

  // Get current orders based on active tab
  const getCurrentOrders = () => {
    switch (activeTab) {
      case "all":
        return allOrders;
      case "inProgress":
        return [...pauseOrders, ...processOrders];
      case "delivered":
        return finishOrders;
      case "cancelled":
        return cancelOrders;
      default:
        return allOrders;
    }
  };

  const currentOrders = getCurrentOrders();

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

  // Get order status info
  const getOrderStatus = (order: Order) => {
    if (cancelOrders.some((o) => o._id === order._id)) {
      return {
        label: "Cancelled",
        className: "bg-red-50 text-red-600 border-red-200",
      };
    }
    if (finishOrders.some((o) => o._id === order._id)) {
      return {
        label: "Completed",
        className: "bg-green-50 text-green-600 border-green-200",
      };
    }
    if (processOrders.some((o) => o._id === order._id)) {
      return {
        label: "In Progress",
        className: "bg-purple-50 text-purple-600 border-purple-200",
      };
    }
    return {
      label: "In Progress",
      className: "bg-purple-50 text-purple-600 border-purple-200",
    };
  };

  // Get order title
  const getOrderTitle = (order: Order) => {
    if (cancelOrders.some((o) => o._id === order._id)) {
      return "Order Cancelled";
    }
    if (finishOrders.some((o) => o._id === order._id)) {
      return "Order Delivered";
    }
    return "Order In Progress";
  };

  return (
    <div className="flex-1 min-h-screen bg-white lg:bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-4 z-10">
        <button onClick={() => navigate("/user")} className="p-1">
          <HugeiconsIcon icon={Cancel01Icon} size={24} />
        </button>
        <h1 className="text-xl font-bold text-main-text">My Orders</h1>
      </div>

      <div className="p-4 lg:p-8 max-w-7xl mx-auto">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <h1 className="text-3xl font-bold text-main-text mb-2">My Orders</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-8 overflow-x-auto pb-2">
          <TabButton
            label="All"
            value="all"
            isActive={activeTab === "all"}
            onClick={setActiveTab}
          />
          <TabButton
            label="In Progress"
            value="inProgress"
            isActive={activeTab === "inProgress"}
            onClick={setActiveTab}
          />
          <TabButton
            label="Delivered"
            value="delivered"
            isActive={activeTab === "delivered"}
            onClick={setActiveTab}
          />
          <TabButton
            label="Cancelled"
            value="cancelled"
            isActive={activeTab === "cancelled"}
            onClick={setActiveTab}
          />
        </div>

        {/* Orders List or Empty State */}
        {!currentOrders || currentOrders.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4 lg:space-y-5">
            {currentOrders.map((order) => {
              const totalCost =
                order.deliveryFee + order?.orderTotal + order.tip;
              const status = getOrderStatus(order);
              const orderTitle = getOrderTitle(order);

              return (
                <div
                  className="flex flex-col gap-4 lg:gap-5 p-4 lg:p-6 w-full rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200"
                  key={order._id}
                >
                  {/* Order Header */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 lg:gap-6">
                    {/* Order Status & Date */}
                    <div className="flex flex-col">
                      <p className="font-semibold text-main-text text-base mb-1">
                        {orderTitle}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(order.updatedAt)}
                      </p>
                    </div>

                    {/* Payment Info */}
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-main/10 flex items-center justify-center shrink-0">
                        <HugeiconsIcon
                          icon={CreditCardPosIcon}
                          size={20}
                          className="lg:w-6 lg:h-6"
                          color="#2e2726"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-main-text text-base">
                          {currency} {totalCost.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Paid with cash
                        </p>
                      </div>
                    </div>

                    {/* Items Count */}
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-main/10 flex items-center justify-center shrink-0">
                        <HugeiconsIcon
                          icon={NoteDoneIcon}
                          size={20}
                          className="lg:w-6 lg:h-6"
                          color="#2e2726"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-main-text text-base">
                          Items
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.orderItems.length}x
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center justify-start lg:justify-center">
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>

                    {/* View Details Link */}
                    <div className="flex items-center justify-start lg:justify-end">
                      <NavLink
                        to={`/order/${order._id}`}
                        className="flex items-center gap-1.5 text-main-text hover:text-main-dull font-medium text-sm transition-colors duration-200 group"
                      >
                        <span>View Order Details</span>
                        <HugeiconsIcon
                          icon={Link01Icon}
                          size={16}
                          className="group-hover:translate-x-1 transition-transform duration-200"
                        />
                      </NavLink>
                    </div>
                  </div>

                  {/* Product Images */}
                  <div className="flex flex-wrap gap-2 lg:gap-3 p-3 lg:p-4 bg-gray-50 rounded-xl">
                    {order.productData
                      .slice(0, 6)
                      .map((product, index: number) => (
                        <div
                          key={index}
                          className="relative w-14 h-14 lg:w-20 lg:h-20 rounded-xl overflow-hidden border border-gray-200 bg-white"
                        >
                          <img
                            className="w-full h-full object-cover"
                            src={product.productImages[0]}
                            alt={product.productName || "Product"}
                          />
                        </div>
                      ))}
                    {order.productData.length > 6 && (
                      <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-xl bg-main/20 flex items-center justify-center border border-main/30">
                        <span className="text-sm font-bold text-main-text">
                          +{order.productData.length - 6}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
