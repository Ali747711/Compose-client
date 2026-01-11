import axios from "axios";
import { serverURL } from "../../libs/configs";
import { Address, AddressInput } from "../../libs/data/types/address";

class AddressService {
  private readonly path: string;

  constructor() {
    this.path = serverURL;
  }

  public createAddress = async (input: AddressInput): Promise<Address> => {
    try {
      const url = `${this.path}/address/add-address`;
      const result = await axios.post(url, input, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Address Service, [createAddress] ERROR: ", error);
      throw error;
    }
  };
}

export default AddressService;
