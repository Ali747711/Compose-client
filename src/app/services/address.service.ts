import { serverURL } from "../../libs/configs";
import {
  Address,
  AddressInput,
  AddressUpdateInput,
} from "../../libs/data/types/address";
import { AlertSuccess } from "../../libs/sweetAlert";
import { apiClient } from "../../libs/api/axios.config";

class AddressService {
  private readonly path: string;

  constructor() {
    this.path = serverURL;
  }

  public createAddress = async (input: AddressInput): Promise<Address> => {
    try {
      const url = `${this.path}/address/add-address`;
      const result = await apiClient.post(url, input, {
        withCredentials: true,
      });

      return result.data;
    } catch (error) {
      console.log("Address Service, [createAddress] ERROR: ", error);
      throw error;
    }
  };

  public updateAddress = async (
    input: AddressUpdateInput
  ): Promise<Address> => {
    try {
      const id = input._id;
      const url = `${this.path}/address/update-address/${id}`;

      const result = await apiClient.put(url, input);
      AlertSuccess("Address successfully added!");
      return result.data;
    } catch (error) {
      console.log("Address Service, [updateAddress] ERROR: ", error);
      throw error;
    }
  };

  public updateToDefault = async (id: string): Promise<Address[]> => {
    try {
      const url = `${this.path}/address/update-default/${id}`;
      const result = await apiClient.put(url);
      return result.data;
    } catch (error) {
      console.log("Address Service, [updateToDefault] ERROR: ", error);
      throw error;
    }
  };

  public updateMany = async (input: Address): Promise<Address[]> => {
    try {
      // console.log("Address Service, incomig data to UpdateMany: ", input);
      const url = `${this.path}/address/update-many`;
      const result = await apiClient.put(url, input);
      // console.log("Address Service, [updateMany] result: ", result);
      return result.data;
    } catch (error) {
      console.log("Address Service, [updateMany] ERROR: ", error);
      throw error;
    }
  };

  public deleteAddress = async (id: string): Promise<void> => {
    try {
      const url = `${this.path}/address/delete-address/${id}`;
      const result = await apiClient.delete(url);
      AlertSuccess(result.data?.message);
      // console.log("Address Service, [deleteAddress] result: ", result);
    } catch (error) {
      console.log("Address Service, [deleteAddress] ERROR: ", error);
      throw error;
    }
  };

  public getUserAddresses = async (): Promise<Address[]> => {
    try {
      const url = `${this.path}/address/addresses`;
      const result = await apiClient.get(url);
      return result.data;
    } catch (error) {
      console.log("Address Service, [getUserAddresses] ERROR: ", error);
      throw error;
    }
  };
}

export default AddressService;
