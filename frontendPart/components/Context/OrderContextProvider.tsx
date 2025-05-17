import { View, Text } from "react-native";
import React, { createContext, useContext, useState } from "react";
import { PropsChildren } from "@/types";

const OrderItemContext = createContext({});
export default function OrderContextProvider({ children }: PropsChildren) {
  const [orderData, setOrderData] = useState<any>();

  return (
    <OrderItemContext.Provider value={{ orderData, setOrderData }}>
      {children}
    </OrderItemContext.Provider>
  );
}

export const useOrderItemContext = () => {
  const context = useContext(OrderItemContext);

  if (!context) {
    throw new Error("errors useOrderItemContext");
  }
  return context;
};
