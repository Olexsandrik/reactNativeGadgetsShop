import { BASE_URL } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useState } from "react";

type DataOrder = {
  productId: number;
  quantity: number;
};
export const usePostOrders = (mainUrl: string) => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);

  const handleAddOrder = async (data: DataOrder) => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/${mainUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(data),
      });

      console.log(data);

      if (!response.ok) {
        throw new Error("Orders failed");
      }
      const res = await response.json();

      setOrders(res.orderId);
      console.log(orders);
    } catch (error) {
      console.error(error);
    }
  };
  return { handleAddOrder, orders, loading, setOrders };
};
