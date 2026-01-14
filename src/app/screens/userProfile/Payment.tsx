import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Payment } from "../../../libs/data/types/payment";
import { retrieveUserPayments } from "./selector";
import { setUserPayments } from "./slice";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Delete02Icon,
  Edit02Icon,
  CreditCardIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import PaymentForm from "./PaymentForm";
import PaymentService from "../../services/payment.service";
import { useGlobals } from "../../hooks/useGlobal";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useGlobals();

  // Get payments from Redux
  const payments: Payment[] = useSelector(retrieveUserPayments);

  // Local UI state
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | undefined>();
  const [loading, setLoading] = useState(false);

  // Service
  const paymentService = new PaymentService();

  // ========== HANDLERS ==========

  // Show add form
  const handleAddPayment = () => {
    setEditingPayment(undefined);
    setShowForm(true);
  };

  // Show edit form
  const handleEditPayment = (payment: Payment) => {
    setEditingPayment(payment);
    setShowForm(true);
  };

  // Save payment (add or update)
  const handleSavePayment = async (savedPayment: Payment) => {
    // console.log("✅ Saved payment:", savedPayment);

    let updatedPayments: Payment[];

    // Check if we're editing or adding new
    const isEditing = payments.some(
      (payment) => payment._id === savedPayment._id
    );

    if (isEditing) {
      // UPDATE: Replace the edited payment
      updatedPayments = payments.map((payment) =>
        payment._id === savedPayment._id ? savedPayment : payment
      );
    } else {
      // ADD: Add new payment to array
      updatedPayments = [...payments, savedPayment];
    }

    // If saved payment is default, make all others non-default
    if (savedPayment.isDefault) {
      updatedPayments = await paymentService.updateMany(savedPayment);
    }

    // Update Redux
    dispatch(setUserPayments(updatedPayments));

    // Close form
    setShowForm(false);
    setEditingPayment(undefined);
  };

  // Delete payment
  // Delete payment
  const handleDeletePayment = async (id: string) => {
    Swal.fire({
      title: "Delete Payment Method?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl shadow-2xl",
        title: "text-2xl font-bold text-gray-900",
        htmlContainer: "text-gray-600",
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border-0 mx-2",
        cancelButton:
          "bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-200 border-0 mx-2",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await paymentService.deletePayment(id);

          // Remove from Redux
          const updatedPayments = payments.filter(
            (payment) => payment._id !== id
          );
          dispatch(setUserPayments(updatedPayments));

          // console.log("Payment deleted");

          // Success message
          Swal.fire({
            title: "Deleted!",
            text: "Payment method has been removed.",
            icon: "success",
            confirmButtonText: "OK",
            timer: 2000,
            timerProgressBar: true,
            customClass: {
              popup: "rounded-2xl shadow-2xl",
              title: "text-2xl font-bold text-gray-900",
              htmlContainer: "text-gray-600",
              confirmButton:
                "bg-main hover:bg-main-dull text-main-text font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border-2 border-main-dull",
            },
            buttonsStyling: false,
          });
        } catch (error) {
          console.error("Error deleting payment:", error);

          // Error message
          Swal.fire({
            title: "Error!",
            text: "Failed to delete payment method. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
            customClass: {
              popup: "rounded-2xl shadow-2xl",
              title: "text-2xl font-bold text-gray-900",
              htmlContainer: "text-gray-600",
              confirmButton:
                "bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border-0",
            },
            buttonsStyling: false,
          });
        } finally {
          setLoading(false);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Cancelled message (optional - can remove if you want)
        Swal.fire({
          title: "Cancelled",
          text: "Your payment method is safe!",
          icon: "info",
          confirmButtonText: "OK",
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            popup: "rounded-2xl shadow-2xl",
            title: "text-2xl font-bold text-gray-900",
            htmlContainer: "text-gray-600",
            confirmButton:
              "bg-main hover:bg-main-dull text-main-text font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border-2 border-main-dull",
          },
          buttonsStyling: false,
        });
      }
    });
  };

  // Set default payment
  const handleSelectPayment = async (id: string) => {
    setLoading(true);
    try {
      // Update on backend (you'll need to create this endpoint)
      const updatedPayments = await paymentService.updateToDefault(id);

      // For now, update locally
      // const updatedPayments = payments.map((payment) => ({
      //   ...payment,
      //   isDefault: payment._id === id,
      // }));

      dispatch(setUserPayments(updatedPayments));

      // console.log("Default payment updated");
    } catch (error) {
      console.error(" Error updating default payment:", error);
      alert("Failed to update default payment");
    } finally {
      setLoading(false);
    }
  };

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

  // ========== RENDER ==========

  // Show form view
  if (showForm) {
    return (
      <PaymentForm
        onClose={() => {
          setShowForm(false);
          setEditingPayment(undefined);
        }}
        onSave={handleSavePayment}
        editPayment={editingPayment}
        userId={authUser?._id || ""}
      />
    );
  }

  // Empty state
  if (!payments || payments.length === 0) {
    return (
      <div className="flex-1 min-h-screen bg-white lg:bg-gray-50">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-4 z-10">
          <button onClick={() => navigate("/user")} className="p-1">
            <HugeiconsIcon icon={Cancel01Icon} size={24} />
          </button>
          <h1 className="text-xl font-bold text-main-text">Payment Methods</h1>
        </div>

        {/* Empty State Content */}
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="flex items-center justify-center w-24 h-24 bg-main/10 rounded-full mb-6">
            <HugeiconsIcon icon={CreditCardIcon} size={48} color="#e3b609" />
          </div>
          <h2 className="text-xl font-bold text-main-text mb-2">
            No payment methods yet
          </h2>
          <p className="text-gray-500 mb-8 text-center">
            Add a payment method to make checkout faster!
          </p>
          <button
            onClick={handleAddPayment}
            className="bg-main hover:bg-main-dull text-main-text font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 border-2 border-main-dull"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={20} />
            Add Payment Method
          </button>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="flex-1 min-h-screen bg-white lg:bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-4 z-10">
        <button onClick={() => navigate("/user")} className="p-1">
          <HugeiconsIcon icon={Cancel01Icon} size={24} />
        </button>
        <h1 className="text-xl font-bold text-main-text">Payment Methods</h1>
      </div>

      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-main-text mb-2">
            Payment Methods
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
        </div>

        {/* Payment List */}
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 lg:p-6 hover:border-main/30 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Radio Button */}
                <div className="flex-shrink-0 pt-1">
                  <input
                    type="radio"
                    id={payment._id}
                    name="selectedPayment"
                    checked={payment.isDefault === true}
                    onChange={() => handleSelectPayment(payment._id)}
                    disabled={loading}
                    className="w-5 h-5 text-main border-gray-300 focus:ring-main focus:ring-2 cursor-pointer disabled:opacity-50"
                  />
                </div>

                {/* Card Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-main to-main-dull rounded-lg flex items-center justify-center">
                    <HugeiconsIcon
                      icon={CreditCardIcon}
                      size={24}
                      color="white"
                    />
                  </div>
                </div>

                {/* Payment Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-main-text">
                        {getCardType(payment.cardNumber)}
                      </h3>
                      {payment.isDefault && (
                        <span className="px-2 py-0.5 bg-main/20 text-main-text text-xs font-semibold rounded">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm font-mono mb-1">
                    {maskCardNumber(payment.cardNumber)}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Expires {String(payment.expiryMonth).padStart(2, "0")}/
                    {payment.expiryYear}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {payment.cardName}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditPayment(payment)}
                    disabled={loading}
                    className="p-2 text-main-dull hover:bg-main/10 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <HugeiconsIcon icon={Edit02Icon} size={20} />
                  </button>
                  <button
                    onClick={() => handleDeletePayment(payment._id)}
                    disabled={loading}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Payment Button */}
        <button
          onClick={handleAddPayment}
          disabled={loading}
          className="mt-6 w-full lg:w-auto flex items-center justify-center gap-2 text-main-dull hover:text-main-text font-semibold py-3 px-6 border-2 border-dashed border-gray-300 hover:border-main rounded-xl transition-all disabled:opacity-50"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={20} />
          Add payment method
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
