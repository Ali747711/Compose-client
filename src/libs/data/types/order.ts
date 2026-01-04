import type { OrderStatus } from "../../enums/order.enum";
import type { Product } from "./product";

export interface Order {
  _id: string;
  orderTotal: number;
  // orderDelivery: number;
  orderStatus: OrderStatus;
  userId: string;
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

export interface OrderItemInput {
  itemQuantity: number;
  itemPrice: number;
  productId: string;
  orderId?: string;
}

export interface OrderUpdateInput {
  orderId: string;
  orderStatus: OrderStatus;
}

export interface OrderInquiry {
  page: number;
  limit: number;
  orderStatus?: OrderStatus;
}
