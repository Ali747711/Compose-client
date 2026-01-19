import { GlobalContext } from "../hooks/useGlobal";
import { useState, type ReactNode } from "react";
import type { User } from "../../libs/data/types/user";
import type { CartItem } from "../../libs/data/types/search";
import { CalendarDate } from "@internationalized/date";
import { Address } from "../../libs/data/types/address";

// ✅ Add token to all requests from localStorage
// it is already setup in axios, so commet it!

// const token = localStorage.getItem("token");
// if (token) {
//   apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // GET user from localStorage (persists across page refresh)
  const [authUser, setAuthUser] = useState<User | null>(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData") as string)
      : null,
  );

  //GET address Data in localStorage:
  const saveAddress = (input: Address[]) => {
    console.log("Addresses: ", input);
    localStorage.setItem("addressData", JSON.stringify(input));
  };

  const addressData: Address[] = localStorage.getItem("addressData")
    ? JSON.parse(localStorage.getItem("addressData") as string)
    : [];

  // GET cart data from localStorage
  const getInitilCartData = (): CartItem[] => {
    const cartJson = localStorage.getItem("cartData");
    return cartJson ? JSON.parse(cartJson) : [];
  };

  const [cartItems, setCartItems] = useState<CartItem[]>(getInitilCartData());

  // ADD to cart
  const onAdd = (input: CartItem) => {
    const exist = cartItems?.find((item) => item._id === input._id);

    let cartUpdate: CartItem[];
    if (exist) {
      cartUpdate = cartItems?.map((item) =>
        item._id === input._id
          ? { ...item, quantity: (item.quantity ?? 0) + 1 }
          : item,
      );
    } else {
      cartUpdate = [...cartItems, { ...input, quantity: 1 }];
    }

    // console.log("Cart after add:", cartUpdate);
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  const onRemove = (input: CartItem) => {
    // console.log("Removing from cart:", input);

    const existingItem = cartItems?.find((item) => item._id === input._id);

    if (!existingItem) {
      console.warn("Item not found in cart");
      return;
    }

    let cartUpdate: CartItem[];

    if (existingItem.quantity === 1) {
      // Remove item completely
      cartUpdate = cartItems.filter((item) => item._id !== input._id);
    } else {
      // Decrement quantity
      cartUpdate = cartItems.map((item) =>
        item._id === input._id
          ? { ...item, quantity: (item.quantity ?? 0) - 1 }
          : item,
      );
    }

    // console.log("Cart after remove:", cartUpdate);
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  // Delete item completely (regardless of quantity)
  const onDelete = (input: CartItem) => {
    // console.log("Deleting from cart:", input);

    const cartUpdate = cartItems.filter((item) => item._id !== input._id);

    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  // Clear entire cart
  const onDeleteAll = () => {
    // console.log("Clearing cart");
    setCartItems([]);
    localStorage.removeItem("cartData");
  };

  // Get total quantity of all items
  const getCartCount = (): number => {
    return cartItems.reduce((total, item) => total + (item.quantity ?? 0), 0);
  };

  // Get quantity of specific item
  const getItemQuantity = (productId: string): number => {
    const item = cartItems.find((item) => item._id === productId);
    return item?.quantity || 0;
  };
  const currency: string = import.meta.env.VITE_CURRENCY;
  const [deliveryDate, setDeliveryDate] = useState<CalendarDate | null>(null);
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const defaultAddress = addressData
    ? addressData.find((address) => address.isDefault)
    : null;
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    defaultAddress || addressData[0] || null,
  );

  console.log("========== Context Provider Initialized =========");
  console.log("Authenticated User:", authUser?.userNick || "None");
  return (
    <GlobalContext.Provider
      value={{
        deliveryDate,
        setDeliveryDate,
        authUser,
        setAuthUser,
        orderBuilder,
        setOrderBuilder,
        showUserLogin,
        setShowUserLogin,
        onAdd,
        onRemove,
        onDelete,
        onDeleteAll,
        getCartCount,
        getItemQuantity,
        cartItems,
        currency,
        searchQuery,
        setSearchQuery,
        setCartItems,
        saveAddress,
        addressData,
        selectedAddress,
        setSelectedAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
