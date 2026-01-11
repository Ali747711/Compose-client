import { GlobalContext } from "../hooks/useGlobal";
import { useState, type ReactNode } from "react";
import type { User } from "../../libs/data/types/user";
import type { CartItem } from "../../libs/data/types/search";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const cookies = new Cookies();

  // GET user from localStorage (persists across page refresh)
  const [authUser, setAuthUser] = useState<User | null>(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData") as string)
      : null
  );

  // useEffect(() => {
  //   const accessToken = cookies.get("accessToken");

  //   if (!accessToken && authUser) {
  //     console.log("No valid cookie, clearing stale user data");
  //     localStorage.removeItem("userData");
  //     setAuthUser(null);
  //   }
  // }, []);
  const currency: string = import.meta.env.VITE_CURRENCY;

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
        item._id === input._id ? { ...item, quantity: item.quantity + 1 } : item
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
        item._id === input._id ? { ...item, quantity: item.quantity - 1 } : item
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
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get quantity of specific item
  const getItemQuantity = (productId: string): number => {
    const item = cartItems.find((item) => item._id === productId);
    return item?.quantity || 0;
  };

  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  console.log("========== Context Provider Initialized =========");
  console.log("Authenticated User:", authUser?.userNick || "None");
  console.log(currency);
  return (
    <GlobalContext.Provider
      value={{
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
