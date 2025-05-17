import { BASE_URL } from "@/constants";
import { DataOrder } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export const usePostOrders = (mainUrl: string) => {
  const [orderInfo, setOrderInfo] = useState<{
    orderId: number;
    productId: number;
  }>();
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

      if (!response.ok) {
        throw new Error("Orders failed");
      }
      const res = await response.json();

      const productIdAndOrderId = {
        orderId: res.orderItem.orderId,
        productId: res.orderItem.productId,
      };

      setOrderInfo(productIdAndOrderId);
      return productIdAndOrderId;
    } catch (error) {
      console.error(error);
    }
  };
  return { handleAddOrder, orderInfo, loading };
};
