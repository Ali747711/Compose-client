import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, CreditCardIcon } from "@hugeicons/core-free-icons";
import type { Payment, PaymentInput } from "../../../libs/data/types/payment";
import PaymentService from "../../services/payment.service";

interface PaymentFormProps {
  onClose: () => void;
  onSave: (payment: Payment) => void;
  editPayment?: Payment;
  userId: string;
}

const PaymentForm = ({
  onClose,
  onSave,
  editPayment,
  userId,
}: PaymentFormProps) => {
  // ========== STATE ==========

  // Single form state
  const [formData, setFormData] = useState<PaymentInput>({
    userId: userId,
    cardName: editPayment?.cardName || "",
    cardNumber: editPayment?.cardNumber || "",
    expiryMonth: editPayment?.expiryMonth || 1,
    expiryYear: editPayment?.expiryYear || new Date().getFullYear(),
    cardCVC: editPayment?.cardCVC || 0,
    isDefault: editPayment?.isDefault || false,
  });

  const [loading, setLoading] = useState(false);

  // Generate month options (01-12)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // Generate year options (current year + 10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear + i);

  // ========== HANDLERS ==========

  // Handle text input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "") // Remove spaces
        .replace(/(\d{4})/g, "$1 ") // Add space after every 4 digits
        .trim()
        .slice(0, 19); // Max 16 digits + 3 spaces
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else if (name === "cardCVC") {
      // Only allow 3-4 digits for CVC
      const cvcValue = value.replace(/\D/g, "").slice(0, 4);
      setFormData((prev) => ({ ...prev, [name]: parseInt(cvcValue) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle select change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  // Handle checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isDefault: e.target.checked }));
  };

  // Submit form
  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields = [
      "cardName",
      "cardNumber",
      "expiryMonth",
      "expiryYear",
      "cardCVC",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof PaymentInput]
    );

    if (missingFields.length > 0) {
      alert(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }

    // Validate card number (16 digits)
    const cardNumberDigits = (formData.cardNumber || "").replace(/\s/g, "");
    if (cardNumberDigits.length !== 16) {
      alert("Card number must be 16 digits");
      return;
    }

    // Validate CVC (3-4 digits)
    if (formData.cardCVC < 100 || formData.cardCVC > 9999) {
      alert("CVC must be 3 or 4 digits");
      return;
    }

    setLoading(true);
    const paymentService = new PaymentService();

    try {
      let savedPayment: Payment;

      if (editPayment) {
        // UPDATE existing payment

        savedPayment = await paymentService.updatePayment({
          _id: editPayment._id,
          ...formData,
        });

        console.log("✅ Payment updated, isDefault:", savedPayment.isDefault);
      } else {
        // CREATE new payment
        console.log("➕ Creating payment with isDefault:", formData.isDefault);

        savedPayment = await paymentService.createPayment(formData);

        console.log("✅ Payment created, isDefault:", savedPayment.isDefault);
      }

      // Send payment back to parent
      console.log("Form DATA: ", savedPayment);
      onSave(savedPayment);
    } catch (error) {
      console.error("❌ Error saving payment:", error);
      alert("Failed to save payment. Please try again.");
      setLoading(false);
    }
  };

  // ========== RENDER ==========

  return (
    <div className="flex-1 min-h-screen bg-white lg:bg-gray-50 pb-20 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center gap-4 z-10">
        <button
          onClick={onClose}
          disabled={loading}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={24} />
        </button>
        <h1 className="text-xl lg:text-2xl font-bold text-main-text">
          {editPayment ? "Edit Payment Method" : "Add Payment Method"}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Card Preview */}
        <div className="bg-gradient-to-br from-main via-main-dull to-main-text rounded-2xl p-6 mb-6 text-white shadow-xl">
          <div className="flex justify-between items-start mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <HugeiconsIcon icon={CreditCardIcon} size={24} color="white" />
            </div>
            <div className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
              {formData.isDefault ? "Default" : "Card"}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-2xl font-mono tracking-wider mb-2">
              {formData.cardNumber || "#### #### #### ####"}
            </p>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-70 mb-1">Card Holder</p>
              <p className="font-semibold uppercase">
                {formData.cardName || "YOUR NAME"}
              </p>
            </div>
            <div>
              <p className="text-xs opacity-70 mb-1">Expires</p>
              <p className="font-semibold">
                {String(formData.expiryMonth).padStart(2, "0")}/
                {String(formData.expiryYear).slice(-2)}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-base font-semibold text-main-text mb-4">
            Card Details
          </h3>

          <div className="space-y-4">
            {/* Card Holder Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Holder Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Toshtemirov Ulugbek"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all disabled:bg-gray-100 uppercase"
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all disabled:bg-gray-100 font-mono text-lg tracking-wider"
              />
              <p className="text-xs text-gray-500 mt-1">16 digits</p>
            </div>

            {/* Expiry Date and CVC */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Month <span className="text-red-500">*</span>
                </label>
                <select
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleSelectChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {String(month).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year <span className="text-red-500">*</span>
                </label>
                <select
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleSelectChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVC <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cardCVC"
                  value={formData.cardCVC || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="123"
                  maxLength={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all disabled:bg-gray-100 font-mono text-center"
                />
                <p className="text-xs text-gray-500 mt-1">3-4 digits</p>
              </div>
            </div>

            {/* Default Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={handleCheckboxChange}
                disabled={loading}
                className="w-5 h-5 text-main border-gray-300 rounded focus:ring-main focus:ring-2 cursor-pointer disabled:opacity-50"
              />
              <label
                htmlFor="isDefault"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Set as default payment method
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-main hover:bg-main-dull text-main-text font-bold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border-2 border-main-dull disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-main-text border-t-transparent"></div>
              <span>Saving...</span>
            </>
          ) : (
            <span>{editPayment ? "Save Changes" : "Add Payment Method"}</span>
          )}
        </button>

        {/* Security Notice */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            🔒 Your payment information is encrypted and secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
