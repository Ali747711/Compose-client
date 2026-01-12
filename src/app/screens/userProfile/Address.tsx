import React, { useEffect, useState } from "react";
import {
  Address,
  AddressInput,
  AddressUpdateInput,
} from "../../../libs/data/types/address";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUserAddresses } from "./selector";
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
import { AlertError } from "../../../libs/sweetAlert";
import { setUserAddresses } from "./slice";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>();
  const data: Address[] = useSelector(retrieveUserAddresses);
  const [addresses, setAddresses] = useState<Address[]>(data);
  const addressService = new AddressService();

  const [selectedAddress, setSelectedAddress] = useState<string>(
    addresses.find((a) => a.isDefault)?._id || addresses[0]?._id || ""
  );

  const handleAddAddress = () => {
    setEditingAddress(undefined);
    setShowForm(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleSaveAddress = async (addressData: Address) => {
    console.log("handleSaveAddress function data: ", addressData);

    // If new address is default, update others
    if (addressData.isDefault) {
      await addressService.updateMany(addressData).then((data) => {
        console.log(data);
        setAddresses([...data]);
      });
    } else {
      setAddresses((prev) => [...prev, addressData]);
    }
    console.log("isDefaults: ", addresses);
    setShowForm(false);
    setEditingAddress(undefined);
  };

  const handleDeleteAddress = (id: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      addressService.deleteAddress(id);
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
      if (selectedAddress === id) {
        setSelectedAddress(addresses[0]?._id || "");
      }
    }
  };

  const handleSelectAddress = async (id: string) => {
    try {
      await addressService.updateToDefault(id).then((data) => {
        setAddresses(data);
      });
      setSelectedAddress(id);
      // Update default address
      // setAddresses((prev) =>
      //   prev.map((addr) => ({
      //     ...addr,
      //     isDefault: addr?._id === id,
      //   }))
      // );
    } catch (error) {
      console.log("Error in [handleSelectAddress]: ", error);
      AlertError(error);
    }
  };

  useEffect(() => {
    dispatch(setUserAddresses(addresses));
  }, [addresses, dispatch]);

  if (showForm) {
    return (
      <AddressForm
        onClose={() => {
          setShowForm(false);
          setEditingAddress(undefined);
        }}
        onSave={handleSaveAddress}
        editAddress={editingAddress}
        userId="user123" // Replace with actual user ID
      />
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="flex-1 min-h-screen bg-white lg:bg-gray-50 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Mobile Header */}
          <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-4 z-10">
            <button onClick={() => navigate("/user")} className="p-1">
              <HugeiconsIcon icon={Cancel01Icon} size={24} />
            </button>
            <h1 className="text-xl font-bold text-main-text">My Cart</h1>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex items-center justify-center w-24 h-24 bg-main/10 rounded-full mb-6">
              <HugeiconsIcon icon={Location04Icon} size={48} color="#e3b609" />
            </div>
            <h2 className="text-xl font-bold text-main-text mb-2">
              You don't have any added address
            </h2>
            <p className="text-gray-500 mb-8">
              Add your address, start shopping!
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
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-white lg:bg-gray-50 p-4 lg:p-8">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-4 z-10">
        <button onClick={() => navigate("/user")} className="p-1">
          <HugeiconsIcon icon={Cancel01Icon} size={24} />
        </button>
        <h1 className="text-xl font-bold text-main-text">My Addresses</h1>
      </div>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 hidden md:flex flex-col">
          <h1 className="text-2xl lg:text-3xl font-bold text-main-text mb-1">
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
                    checked={selectedAddress === address._id}
                    onChange={() => handleSelectAddress(address._id)}
                    className="w-5 h-5 text-main border-gray-300 focus:ring-main focus:ring-2 cursor-pointer"
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
                    className="p-2 text-main-dull hover:bg-main/10 rounded-lg transition-colors"
                  >
                    <HugeiconsIcon icon={Edit02Icon} size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
          className="mt-6 w-full lg:w-auto flex items-center justify-center gap-2 text-main-dull hover:text-main-text font-semibold py-3 px-6 border-2 border-dashed border-gray-300 hover:border-main rounded-xl transition-all"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={20} />
          Add address
        </button>
      </div>
    </div>
  );
};

export default AddressPage;
