import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Building03Icon,
  ArrowLeft01Icon,
  OfficeFreeIcons,
} from "@hugeicons/core-free-icons";
import type {
  Address,
  AddressInput,
  AddressUpdateInput,
} from "../../../libs/data/types/address";
import AddressService from "../../services/address.service";

interface AddressFormProps {
  onClose: () => void;
  onSave: (address: Address) => void;
  editAddress?: AddressUpdateInput;
  userId: string;
}

const AddressForm = ({
  onClose,
  onSave,
  editAddress,
  userId,
}: AddressFormProps) => {
  const [selectedType, setSelectedType] = useState<string>();
  const [newAddress, setNewAddress] = useState<Address>([]);
  const [formData, setFormData] = useState<AddressUpdateInput>({
    _id: editAddress?._id || "",
    label: editAddress?.label || selectedType || "Home",
    street: editAddress?.street || "",
    city: editAddress?.city || "",
    state: editAddress?.state || "",
    zipcode: editAddress?.zipcode || "",
    country: editAddress?.country || "",
    isDefault: editAddress?.isDefault || false,
  });
  const [addFormData, setAddFormData] = useState<AddressInput>({
    userId: userId || "",
    label: selectedType || "Home",
    street: editAddress?.street || "",
    city: editAddress?.city || "",
    state: editAddress?.state || "",
    zipcode: editAddress?.zipcode || "",
    country: editAddress?.country || "",
    isDefault: editAddress?.isDefault || false,
  });

  const addressTypes = [
    { label: "Home", icon: Home01Icon },
    { label: "Apartment", icon: Building03Icon },
    { label: "Office", icon: OfficeFreeIcons },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setAddFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setFormData((prev) => ({ ...prev, label: type }));
    setAddFormData((prev) => ({ ...prev, label: type }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    const addressService = new AddressService();
    const requiredFields = ["street", "city", "state", "zipcode", "country"];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof AddressUpdateInput]
    );

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }
    if (editAddress) {
      await addressService.updateAddress(formData).then((data) => {
        setNewAddress(data);
        onSave(data);
        console.log("UPDATE ADDRESS");
      });
    } else {
      await addressService.createAddress(addFormData).then((data) => {
        setNewAddress(data);
        onSave(data);
        console.log("ADD ADDRESS");
      });

      // console.log("Address new address, result: ", result);
    }
    console.log("Address submittion is Done!");
    // onSave(newAddress);
  };

  return (
    <div className="flex-1 min-h-screen bg-white lg:bg-gray-50 pb-20 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center gap-4 z-10">
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
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
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  selectedType === type.label
                    ? "border-main bg-main/10 text-main-text"
                    : "border-gray-200 hover:border-main/50 text-gray-600"
                }`}
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
            {/* Street Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                placeholder="123 Main Street"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all"
                required
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
                  placeholder="Busan"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Province <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Busan"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Zip Code and Country */}
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
                  placeholder="48000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all"
                  required
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
                  placeholder="South Korea"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Default Address Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    isDefault: e.target.checked,
                  }));
                  setAddFormData((prev) => ({
                    ...prev,
                    isDefault: e.target.checked,
                  }));
                }}
                className="w-5 h-5 text-main border-gray-300 rounded focus:ring-main focus:ring-2 cursor-pointer"
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

        {/* Save Button */}
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="w-full bg-main hover:bg-main-dull text-main-text font-bold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border-2 border-main-dull active:scale-98"
        >
          {editAddress ? "Save Changes" : "Add Address"}
        </button>
      </div>
    </div>
  );
};

export default AddressForm;

// import { useState } from "react";
// import { Address } from "../../../libs/data/types/address";
// import { useGlobals } from "../../hooks/useGlobal";
// import { AlertError } from "../../../libs/sweetAlert";
// import AddressService from "../../services/address.service";

// export interface AddressInput {
//   userId: string;
//   label: string;
//   street: string;
//   city: string;
//   state: string;
//   zipcode: string;
//   country: string;
//   isDefault?: boolean;
// }

// const AddressForm = () => {
//   const { authUser } = useGlobals();
//   const [addressForm, setAddressForm] = useState<Address>({
//     userId: authUser?._id,
//     label: "HOME",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     isDefault: true,
//   });
//   const handleSubmit = () => {
//     try {
//       const addressService = new AddressService();
//       addressService.createAddress(addressForm).then((data) => {
//         console.log(data);
//       });
//     } catch (error) {
//       console.log("Error in Address Form: ", error);
//       AlertError(error);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, name } = e.target;
//     setAddressForm((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="mt-16 pl-5">
//       <div className="mb-5">
//         <div className="flex items-center gap-3 mb-2">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//             Main Address Page
//           </h1>
//         </div>
//         <div className="w-20 h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
//       </div>
//       <form className="mt-16 min-w-5xl p-16 border min-h-screen flex flex-col gap-2">
//         <label>Address Label</label>
//         <input
//           className="outline-2 p-2 rounded-2xl"
//           onChange={handleInputChange}
//           value={addressForm.label}
//           type="text"
//           name="label"
//         />
//         <label>Street</label>
//         <input
//           className="outline-2 p-2 rounded-2xl"
//           onChange={handleInputChange}
//           value={addressForm.street}
//           type="text"
//           name="street"
//         />
//         <label>City</label>
//         <input
//           className="outline-2 p-2 rounded-2xl"
//           onChange={handleInputChange}
//           value={addressForm.city}
//           type="text"
//           name="city"
//         />
//         <label>State</label>
//         <input
//           className="outline-2 p-2 rounded-2xl"
//           onChange={handleInputChange}
//           value={addressForm.state}
//           type="text"
//           name="state"
//         />

//         <label>Zipcode</label>
//         <input
//           className="outline-2 p-2 rounded-2xl"
//           onChange={handleInputChange}
//           value={addressForm.zipcode}
//           type="text"
//           name="zipcode"
//         />

//         <label>country</label>
//         <input
//           className="outline-2 p-2 rounded-2xl"
//           onChange={handleInputChange}
//           value={addressForm.country}
//           type="text"
//           name="country"
//         />
//         <button
//           onClick={() => handleSubmit()}
//           className="bg-main p-5 rounded-2xl mt-5 hover:bg-main-dull cursor-pointer"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddressForm;
