import { useEffect, useState } from "react";

import { BASE_URL } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useGetAllOrderItem = (mainUrl: string, orderId: number) => {
  const [allOrderItem, setAllOrderItem] = useState<any>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/${mainUrl}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const res = await response.json();
        setAllOrderItem(res);
      } catch (e) {
        console.error("Failed to fetch order items:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [orderId]);

  return { allOrderItem, loading };
};
