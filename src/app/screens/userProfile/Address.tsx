import { useState } from "react";
import { Address } from "../../../libs/data/types/address";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUserAddresses } from "./selector";
import { setUserAddresses } from "./slice";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Delete02Icon,
  Edit02Icon,
  Location04Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import AddressForm from "./AddressForm";
import AddressService from "../../services/address.service";
import { useNavigate } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobal";

const AddressPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useGlobals();

  // Get addresses from Redux
  const addresses: Address[] = useSelector(retrieveUserAddresses);

  // Local UI state
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>();
  const [loading, setLoading] = useState(false);

  // Service
  const addressService = new AddressService();

  // ========== HANDLERS ==========

  // Show add form
  const handleAddAddress = () => {
    setEditingAddress(undefined);
    setShowForm(true);
  };

  // Show edit form
  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  // Save address (add or update)
  const handleSaveAddress = async (savedAddress: Address) => {
    console.log("✅ Saved address:", savedAddress);

    let updatedAddresses: Address[];

    // Check if we're editing or adding new
    const isEditing = addresses.some((addr) => addr._id === savedAddress._id);

    if (isEditing) {
      // UPDATE: Replace the edited address
      updatedAddresses = addresses.map((addr) =>
        addr._id === savedAddress._id ? savedAddress : addr
      );
    } else {
      // ADD: Add new address to array
      updatedAddresses = [...addresses, savedAddress];
    }

    // If saved address is default, make all others non-default
    if (savedAddress.isDefault) {
      updatedAddresses = await addressService.updateMany(savedAddress);
    }

    // Update Redux
    dispatch(setUserAddresses(updatedAddresses));

    // Close form
    setShowForm(false);
    setEditingAddress(undefined);
  };

  // Delete address
  const handleDeleteAddress = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this address?")) {
      return;
    }

    setLoading(true);
    try {
      await addressService.deleteAddress(id);

      // Remove from Redux
      const updatedAddresses = addresses.filter((addr) => addr._id !== id);
      dispatch(setUserAddresses(updatedAddresses));

      console.log("Address deleted");
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete address");
    } finally {
      setLoading(false);
    }
  };

  // Set default address (when clicking radio button)
  const handleSelectAddress = async (id: string) => {
    setLoading(true);
    try {
      // Update on backend
      const updatedAddresses = await addressService.updateToDefault(id);

      // Update Redux with backend response
      dispatch(setUserAddresses(updatedAddresses));

      console.log("Default address updated");
    } catch (error) {
      console.error("Error updating default address:", error);
      alert("Failed to update default address");
    } finally {
      setLoading(false);
    }
  };

  // ========== RENDER ==========

  // Show form view
  if (showForm) {
    return (
      <AddressForm
        onClose={() => {
          setShowForm(false);
          setEditingAddress(undefined);
        }}
        onSave={handleSaveAddress}
        editAddress={editingAddress}
        userId={authUser?._id || ""}
      />
    );
  }

  // Empty state
  if (!addresses || addresses.length === 0) {
    return (
      <div className="flex-1 min-h-screen bg-white lg:bg-gray-50">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-4 z-10">
          <button onClick={() => navigate("/user")} className="p-1">
            <HugeiconsIcon icon={Cancel01Icon} size={24} />
          </button>
          <h1 className="text-xl font-bold text-main-text">My Addresses</h1>
        </div>

        {/* Empty State Content */}
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="flex items-center justify-center w-24 h-24 bg-main/10 rounded-full mb-6">
            <HugeiconsIcon icon={Location04Icon} size={48} color="#e3b609" />
          </div>
          <h2 className="text-xl font-bold text-main-text mb-2">
            No addresses yet
          </h2>
          <p className="text-gray-500 mb-8 text-center">
            Add your address to start shopping!
          </p>
          <button
            onClick={handleAddAddress}
            className="bg-main hover:bg-main-dull text-main-text font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 border-2 border-main-dull"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={20} />
            Add New Address
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
        <h1 className="text-xl font-bold text-main-text">My Addresses</h1>
      </div>

      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-main-text mb-2">
            My Addresses
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
        </div>

        {/* Address List */}
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 lg:p-6 hover:border-main/30 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Radio Button */}
                <div className="flex-shrink-0 pt-1">
                  <input
                    type="radio"
                    id={address._id}
                    name="selectedAddress"
                    checked={address.isDefault === true}
                    onChange={() => handleSelectAddress(address._id)}
                    disabled={loading}
                    className="w-5 h-5 text-main border-gray-300 focus:ring-main focus:ring-2 cursor-pointer disabled:opacity-50"
                  />
                </div>

                {/* Address Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-main-text">
                        {address.label}
                      </h3>
                      {address.isDefault && (
                        <span className="px-2 py-0.5 bg-main/20 text-main-text text-xs font-semibold rounded">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {address.street}, {address.city}, {address.state}{" "}
                    {address.zipcode}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditAddress(address)}
                    disabled={loading}
                    className="p-2 text-main-dull hover:bg-main/10 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <HugeiconsIcon icon={Edit02Icon} size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address._id)}
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

        {/* Add Address Button */}
        <button
          onClick={handleAddAddress}
          disabled={loading}
          className="mt-6 w-full lg:w-auto flex items-center justify-center gap-2 text-main-dull hover:text-main-text font-semibold py-3 px-6 border-2 border-dashed border-gray-300 hover:border-main rounded-xl transition-all disabled:opacity-50"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={20} />
          Add address
        </button>
      </div>
    </div>
  );
};

export default AddressPage;
