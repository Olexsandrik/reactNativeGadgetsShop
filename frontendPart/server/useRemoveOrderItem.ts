import { BASE_URL } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useState } from "react";

export const useRemoveOrderItem = (mainUrl: string) => {
  const [loading, setLoading] = useState(false);

  const handleRemoveOrderItem = async () => {
    if (!mainUrl) return;
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/${mainUrl}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Orders failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { handleRemoveOrderItem, loading };
};
