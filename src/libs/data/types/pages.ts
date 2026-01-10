import type { Product } from "./product";
import type { User } from "./user";

export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductPageState;
  categoryPage: CategoryPageState;
  userProfilePage: UserProfilePageState;
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
  products: [];
  chosenProduct: Product | null;
}

export interface UserProfilePageState {
  products: [];
}
