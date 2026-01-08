import type { Product } from "./product";
import type { User } from "./user";

export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  categoryPage: ProductsPageState;
}

export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: User[];
}

export interface ProductsPageState {
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
