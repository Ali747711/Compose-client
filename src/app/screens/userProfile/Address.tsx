import React from "react";
import { Address } from "../../../libs/data/types/address";
import { useSelector } from "react-redux";
import { retrieveUserAddresses, retrieveUserOrders } from "./selector";
import { Order } from "../../../libs/data/types/order";

const AddressPage = () => {
  const addresses: Address[] = useSelector(retrieveUserAddresses); // I cannot addresses here
  const orders: Order[] = useSelector(retrieveUserOrders); // and here
  console.log(orders);
  console.log(addresses);
  return (
    <div className="p-5">
      <h1 className="text-3xl">Main address Page</h1>
      <div className="w-full bg-border h-1 mt-5"></div>
      <div className="mt-5">
        <h1>User Addresses:</h1>
        <div>{}</div>
      </div>
    </div>
  );
};

export default AddressPage;
