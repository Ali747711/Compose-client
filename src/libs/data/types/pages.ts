import { Address } from "./address";
import { Order } from "./order";
import { Payment } from "./payment";
import type { Product } from "./product";
import type { User } from "./user";

export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductPageState;
  categoryPage: CategoryPageState;
  userProfilePage: UserProfilePageState;
  checkoutPage: CheckoutPageState;
  cartPage: CartPageState;
  orderPage: OrderPageState;
}

export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: User[];
}

export interface CategoryPageState {
  products: [];
  coffee: Product[];
  decaf_coffee: Product[];
  cold_brew: Product[];
  beverage: Product[];
  smoothie: Product[];
  juice: Product[];
  ade: Product[];
  milkshake: Product[];
  frappe: Product[];
  tea_tea_beverage: Product[];
}
export interface ProductPageState {
  products: Product[];
  chosenProduct: Product | null;
}

export interface UserProfilePageState {
  products: Product[];
  userDetails: User | null;
  addresses: Address[];
  payments: Payment[];

  // Orders
  pauseOrders: Order[];
  processOrders: Order[];
  finishOrders: Order[];
  cancelOrders: Order[];
  allOrders: Order[];
}

export interface CheckoutPageState {
  addresses: Address[];
  payments: Payment[];
  products: Product[];
}

export interface CartPageState {
  products: Product[];
}

export interface OrderPageState {
  pauseOrders: Product[];
  processOrders: Product[];
  finishOrders: Product[];
}
