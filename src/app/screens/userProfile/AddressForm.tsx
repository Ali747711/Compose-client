import { useState } from "react";
import { Address } from "../../../libs/data/types/address";
import { useGlobals } from "../../hooks/useGlobal";
import { AlertError } from "../../../libs/sweetAlert";
import AddressService from "../../services/address.service";

export interface AddressInput {
  userId: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  isDefault?: boolean;
}

const AddressForm = () => {
  const { authUser } = useGlobals();
  const [addressForm, setAddressForm] = useState<Address>({
    userId: authUser?._id,
    label: "HOME",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    isDefault: true,
  });
  const handleSubmit = () => {
    try {
      const addressService = new AddressService();
      addressService.createAddress(addressForm).then((data) => {
        console.log(data);
      });
    } catch (error) {
      console.log("Error in Address Form: ", error);
      AlertError(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mt-16 pl-5">
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Main Address Page
          </h1>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
      </div>
      <form className="mt-16 min-w-5xl p-16 border min-h-screen flex flex-col gap-2">
        <label>Address Label</label>
        <input
          className="outline-2 p-2 rounded-2xl"
          onChange={handleInputChange}
          value={addressForm.label}
          type="text"
          name="label"
        />
        <label>Street</label>
        <input
          className="outline-2 p-2 rounded-2xl"
          onChange={handleInputChange}
          value={addressForm.street}
          type="text"
          name="street"
        />
        <label>City</label>
        <input
          className="outline-2 p-2 rounded-2xl"
          onChange={handleInputChange}
          value={addressForm.city}
          type="text"
          name="city"
        />
        <label>State</label>
        <input
          className="outline-2 p-2 rounded-2xl"
          onChange={handleInputChange}
          value={addressForm.state}
          type="text"
          name="state"
        />

        <label>Zipcode</label>
        <input
          className="outline-2 p-2 rounded-2xl"
          onChange={handleInputChange}
          value={addressForm.zipcode}
          type="text"
          name="zipcode"
        />

        <label>country</label>
        <input
          className="outline-2 p-2 rounded-2xl"
          onChange={handleInputChange}
          value={addressForm.country}
          type="text"
          name="country"
        />
        <button
          onClick={() => handleSubmit()}
          className="bg-main p-5 rounded-2xl mt-5 hover:bg-main-dull cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
