import { serverURL } from "../../libs/configs";

import { AlertSuccess } from "../../libs/sweetAlert";
import { apiClient } from "../../libs/api/axios.config";
import {
  Payment,
  PaymentInput,
  PaymentUpdateInput,
} from "../../libs/data/types/payment";

class PaymentService {
  private readonly path: string;

  constructor() {
    this.path = serverURL;
  }

  public createPayment = async (input: PaymentInput): Promise<Payment> => {
    try {
      const url = `${this.path}/payment/add-payment`;
      const result = await apiClient.post(url, input);

      return result.data;
    } catch (error) {
      console.log("Address Service, [createPayment] ERROR: ", error);
      throw error;
    }
  };

  public updatePayment = async (
    input: PaymentUpdateInput
  ): Promise<Payment> => {
    try {
      const id = input._id;
      const url = `${this.path}/payment/edit-payment/${id}`;

      const result = await apiClient.put(url, input);
      AlertSuccess("Address successfully added!");
      return result.data;
    } catch (error) {
      console.log("Payment Service, [updatePayment] ERROR: ", error);
      throw error;
    }
  };

  public updateToDefault = async (id: string): Promise<Payment[]> => {
    try {
      const url = `${this.path}/payment/update-default/${id}`;
      const result = await apiClient.put(url);
      return result.data;
    } catch (error) {
      console.log("Payment Service, [updateToDefault] ERROR: ", error);
      throw error;
    }
  };

  public updateMany = async (input: Payment): Promise<Payment[]> => {
    try {
      // console.log("Payment Service, incomig data to UpdateMany: ", input);
      const url = `${this.path}/payment/update-many`;
      const result = await apiClient.put(url, input);
      // console.log("Payment Service, [updateMany] result: ", result);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log("Payment Service, [updateMany] ERROR: ", error);
      throw error;
    }
  };

  public deletePayment = async (id: string): Promise<void> => {
    try {
      const url = `${this.path}/payment/delete-payment/${id}`;
      const result = await apiClient.delete(url);
      AlertSuccess(result.data?.message);
      // console.log("Payment Service, [deletePayment] result: ", result);
    } catch (error) {
      console.log("Payment Service, [deletePayment] ERROR: ", error);
      throw error;
    }
  };
  public getPayments = async (): Promise<Payment[]> => {
    try {
      const url = `${this.path}/payment/get-payments`;
      const result = await apiClient.get(url);
      return result.data;
    } catch (error) {
      console.log("Payment Service, [deletePayment] ERROR: ", error);
      throw error;
    }
  };
}

export default PaymentService;
