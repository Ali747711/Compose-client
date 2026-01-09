// import { useState } from "react";
// import type { CartItem } from "../../libs/data/types/search";

// const useBasket = () => {
//   const getInitialCartData = (): CartItem[] => {
//     const cartJson = localStorage.getItem("cartData");
//     return cartJson ? JSON.parse(cartJson) : [];
//   };
//   const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCartData());

//   const onAdd = (input: CartItem) => {
//     console.log("Adding to cart:", input);

//     const existingItem = cartItems.find((item) => item._id === input._id);

//     let cartUpdate: CartItem[];

//     if (existingItem) {
//       // ✅ FIX: Increment quantity correctly
//       cartUpdate = cartItems.map((item) =>
//         item._id === input._id ? { ...item, quantity: item.quantity + 1 } : item
//       );
//     } else {
//       // Add new item with quantity 1
//       cartUpdate = [...cartItems, { ...input, quantity: 1 }];
//     }

//     console.log("Cart after add:", cartUpdate);
//     setCartItems(cartUpdate);
//     localStorage.setItem("cartData", JSON.stringify(cartUpdate));
//   };

//   const onRemove = (input: CartItem) => {
//     console.log("Removing from cart:", input);

//     const existingItem = cartItems.find((item) => item._id === input._id);

//     if (!existingItem) {
//       console.warn("Item not found in cart");
//       return;
//     }

//     let cartUpdate: CartItem[];

//     if (existingItem.quantity === 1) {
//       // Remove item completely
//       cartUpdate = cartItems.filter((item) => item._id !== input._id);
//     } else {
//       // Decrement quantity
//       cartUpdate = cartItems.map((item) =>
//         item._id === input._id ? { ...item, quantity: item.quantity - 1 } : item
//       );
//     }

//     console.log("Cart after remove:", cartUpdate);
//     setCartItems(cartUpdate);
//     localStorage.setItem("cartData", JSON.stringify(cartUpdate));
//   };

//   const onDelete = (input: CartItem) => {
//     const cartUpdate = cartItems.filter(
//       (item: CartItem) => item._id !== input._id
//     );
//     setCartItems(cartUpdate);
//     localStorage.setItem("cartData", JSON.stringify(cartUpdate));
//   };

//   const onDeleteAll = () => {
//     setCartItems([]);
//     localStorage.removeItem("cartData");
//   };

//   const getCartCount = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//   const getItemQuantity = (id: string): number => {
//     const item = cartItems.find((item) => item._id === id);
//     return item?.quantity || 0;
//   };

//   return {
//     cartItems,
//     onAdd,
//     onRemove,
//     onDelete,
//     onDeleteAll,
//     getCartCount,
//     getItemQuantity,
//   };
// };

// export default useBasket;
