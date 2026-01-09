import { ShoppingCart02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Divider from "../divider";
import { useGlobals } from "../../hooks/useGlobal";

const Basket = () => {
  const { onAdd, onRemove, cartItems, getItemQuantity } = useGlobals();
  //   console.log(cartItems);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="hidden md:flex flex-col absolute top-20 right-0 w-100 min-h-70 bg-white rounded-3xl p-8 shadow-lg shadow-black"
    >
      {cartItems.length !== 0 ? (
        <div>
          <p>{cartItems.length} items</p>
          {cartItems.map((item, i) => (
            <div key={i} className="flex flex-row items-center justify-between">
              <div>
                <img src={item.image} alt={item.name} className="h-10 w-10" />
              </div>
              <div>
                <h1>{item.name}</h1>
                <p>{item.price}</p>
              </div>
              <div className="flex flex-row gap-1.5">
                <button onClick={() => onRemove(item)}>-</button>
                <p>{getItemQuantity(item._id)}</p>
                <button onClick={() => onAdd(item)}>+</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-lg font-bold mb-3">My Cart</h1>
          <Divider width="100%" height="2px" backgroundColor="#c4c6d4" />

          <div className="mt-10 flex flex-col justify-center items-center">
            <div className="flex justify-center items-center rounded-full h-25 w-25 bg-main/45 m-5 hover:scale-110 transition-transform">
              <HugeiconsIcon icon={ShoppingCart02Icon} size={33} />
            </div>
            <p className="font-semibold">Your cart is hungry</p>
            <p className="font-light text-sm">
              Fill your cart with our super delicious drinks!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
