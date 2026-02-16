import { apiClient } from "../../libs/api/axios.config";
import { serverURL } from "../../libs/configs";
import {
  Order,
  OrderInput,
  OrderInquiry,
  OrderItemInput,
  OrderUpdateInput,
} from "../../libs/data/types/order";
import { CartItem } from "../../libs/data/types/search";

class OrderService {
  private readonly path: string;

  constructor() {
    this.path = serverURL;
  }

  public createOrder = async (input: OrderInput): Promise<Order> => {
    try {
      const cartItems: OrderItemInput[] = input.orderItemInput.map(
        (item: CartItem) => {
          return {
            itemQuantity: item.quantity,
            itemPrice: item.price,
            productId: item._id,
          };
        },
      );

      const url = `${this.path}/order/create-order`;
      const result = await apiClient.post(url, {
        ...input,
        orderItemInput: cartItems,
      });
      // console.log("Created order: ", result.data);
      return result.data;
    } catch (err) {
      console.log("Error.createOrder:", err);
      throw err;
    }
  };

  public getOrder = async (id: string | undefined): Promise<Order> => {
    try {
      const url = `${this.path}/order/get-order/${id}`;
      const result = await apiClient.get(url);
      return result.data[0];
    } catch (err) {
      console.log("Error getOrder:", err);
      throw err;
    }
  };

  public getUserOrders = async (input: OrderInquiry): Promise<Order[]> => {
    try {
      let url = `${this.path}/order/get-user-orders?orderStatus=${input.orderStatus}`;
      if (input.limit) {
        url += `&limit=${input.limit}`;
      }

      const result = await apiClient.get(url);
      return result.data;
    } catch (err) {
      console.log("Error getUserOrders:", err);
      throw err;
    }
  };

  public updateOrder = async (input: OrderUpdateInput): Promise<Order> => {
    try {
      const url = `${this.path}/order/update-order`;
      const result = await apiClient.put(url, input);

      // console.log("Order update: ", result);
      return result.data;
    } catch (err) {
      console.log("Error updateOrder:", err);
      throw err;
    }
  };
}

export default OrderService;
