import { BASE_URL } from "@/constants";
import { AsyncLocalStorage } from "async_hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export const useCatalog = (mainUrl: string) => {
  const [catalog, setCatalog] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleGetCategories = async (id: number) => {
    setLoading(true);

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw Error("Error token");
    }
    try {
      const res = await fetch(`${BASE_URL}/${mainUrl}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const response = await res.json();
      setCatalog(response);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { catalog, handleGetCategories, loading, setCatalog };
};
