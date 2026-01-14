import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Building03Icon,
  ArrowLeft01Icon,
  OfficeFreeIcons,
} from "@hugeicons/core-free-icons";
import type { Address, AddressInput } from "../../../libs/data/types/address";
import AddressService from "../../services/address.service";
import { AlertError } from "../../../libs/sweetAlert";

interface AddressFormProps {
  onClose: () => void;
  onSave: (address: Address) => void;
  editAddress?: Address;
  userId: string;
}

const AddressForm = ({
  onClose,
  onSave,
  editAddress,
  userId,
}: AddressFormProps) => {
  // ========== STATE ==========

  // Single form state
  const [formData, setFormData] = useState<AddressInput>({
    userId: userId,
    label: editAddress?.label || "Home",
    street: editAddress?.street || "",
    city: editAddress?.city || "",
    state: editAddress?.state || "",
    zipcode: editAddress?.zipcode || "",
    country: editAddress?.country || "",
    isDefault: editAddress?.isDefault || false,
  });

  const [loading, setLoading] = useState(false);

  // Address types
  const addressTypes = [
    { label: "Home", icon: Home01Icon },
    { label: "Apartment", icon: Building03Icon },
    { label: "Office", icon: OfficeFreeIcons },
  ];

  // ========== HANDLERS ==========

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle type selection
  const handleTypeChange = (type: string) => {
    setFormData((prev) => ({ ...prev, label: type }));
  };

  // Handle checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isDefault: e.target.checked }));
  };

  // Submit form
  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields = ["street", "city", "state", "zipcode", "country"];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof AddressInput]
    );

    if (missingFields.length > 0) {
      alert(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }

    setLoading(true);
    const addressService = new AddressService();

    try {
      let savedAddress: Address;

      if (editAddress) {
        // UPDATE existing address
        console.log("Updating address with isDefault:", formData.isDefault);

        savedAddress = await addressService.updateAddress({
          _id: editAddress._id,
          ...formData,
        });

        console.log(" Address updated, isDefault:", savedAddress.isDefault);
      } else {
        // CREATE new address
        console.log("Creating address with isDefault:", formData.isDefault);

        savedAddress = await addressService.createAddress(formData);

        console.log("Address created, isDefault:", savedAddress.isDefault);
      }

      onSave(savedAddress);
    } catch (error) {
      console.error("Error saving address:", error);
      AlertError(error);
      setLoading(false); // Only set loading false on error
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
          {editAddress ? "Edit Address" : "Add New Address"}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Address Type Selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-base font-semibold text-main-text mb-4">
            Select Address Type
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {addressTypes.map((type) => (
              <button
                key={type.label}
                onClick={() => handleTypeChange(type.label)}
                disabled={loading}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  formData.label === type.label
                    ? "border-main bg-main/10 text-main-text"
                    : "border-gray-200 hover:border-main/50 text-gray-600"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <HugeiconsIcon icon={type.icon} size={24} />
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Address Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-base font-semibold text-main-text mb-4">
            Address Details
          </h3>

          <div className="space-y-4">
            {/* Street */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="123 Main Street"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all disabled:bg-gray-100"
              />
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Busan"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Busan"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Zipcode and Country */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="48000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="South Korea"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                />
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
                Set as default address
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
            <span>{editAddress ? "Save Changes" : "Add Address"}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
