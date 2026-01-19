import type { OrderStatus } from "../../enums/order.enum";
import { Address } from "./address";
import { Payment } from "./payment";
import type { Product } from "./product";
import { CartItem } from "./search";

export interface Order {
  _id: string;
  orderTotal: number;
  orderStatus: OrderStatus;
  userId: string;
  deliveryDate: string;
  deliveryFee: number;
  tip: number;
  orderAddress: string | Address;
  orderPayment: string | Payment;
  createdAt: Date;
  updatedAt: Date;

  // From aggregation
  orderItems: OrderItem[];
  productData: Product[];
}

export interface OrderItem {
  _id: string;
  itemQuantity: number;
  itemPrice: number;
  productId: string;
  orderId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderInput {
  deliveryFee: number;
  tip: number;
  orderAddress: Address;
  orderPayment: Payment;
  deliveryDate: string;
  orderItemInput: CartItem[];
}

export interface OrderItemInput {
  itemQuantity: number | undefined;
  itemPrice: number | undefined;
  productId: string;
  orderId?: string;
}

export interface OrderUpdateInput {
  orderId: string;
  orderStatus: OrderStatus;
}

export interface OrderInquiry {
  page?: number;
  limit?: number;
  orderStatus?: OrderStatus;
}
