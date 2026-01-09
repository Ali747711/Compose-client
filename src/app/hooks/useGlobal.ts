import { createContext, useContext } from "react";
import type { User } from "../../libs/data/types/user";
import type { CartItem } from "../../libs/data/types/search";
import type { Product } from "../../libs/data/types/product";

interface GlobalInterface {
  showUserLogin: boolean;
  setShowUserLogin: (input: boolean) => void;
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
  orderBuilder: Date;
  setOrderBuilder: (input: Date) => void;
  onAdd: (input: CartItem) => void;
  onRemove: (input: CartItem) => void;
  onDelete: (input: CartItem) => void;
  onDeleteAll: () => void;
  getCartCount: () => number;
  getItemQuantity: (input: string) => number;
  cartItems: CartItem[];
  currency: string;
  products: Product[];
}

export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined
);

export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used in Provider");
  }
  return context;
};
