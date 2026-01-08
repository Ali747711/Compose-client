import { useState } from "react";
import type { CartItem } from "../../libs/data/types/search";

const useBasket = () => {
  const cartJson: string | null = localStorage.getItem("cartData");
  const curretCart = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(curretCart);

  const onAdd = (input: CartItem) => {
    console.log("incoming: ", input);
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id
    );

    if (exist) {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id ? { ...exist, quantity: exist.quantity++ } : item
      );
      console.log("Added If Cart item: ", cartUpdate);
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = [...cartItems, { ...input }];
      console.log("Added Else Cart item: ", cartUpdate);
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  const onRemove = (input: CartItem) => {
    console.log("incoming: ", input);
    const exist: any = cartItems.map((item) => item._id === input._id);

    if (exist?.quantity === 1) {
      const cartUpdate = cartItems.filter(
        (item: CartItem) => item._id !== input._id
      );
      console.log("Removed when 1 Cart item: ", cartUpdate);
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist?.quantity - 1 }
          : item
      );
      console.log("Removed Cart item: ", cartUpdate);
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  const onDelete = (input: CartItem) => {
    const cartUpdate = cartItems.filter(
      (item: CartItem) => item._id !== input._id
    );
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cartData");
  };

  const getCartCount = () => {
    let cartTotal: number = 0;
    for (const item in cartItems) {
      cartTotal += cartItems[item].quantity;
    }
    return cartTotal;
  };

  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    getCartCount,
  };
};

export default useBasket;
