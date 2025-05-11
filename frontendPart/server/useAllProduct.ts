import { BASE_URL } from "@/constants";
import { AsyncLocalStorage } from "async_hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { error } from "console";

export const useAllProduct = (mainUrl: string) => {
  const [allProducts, setAllProducts] = useState();
  const [productLoading, setProductLoading] = useState(false);

  const handleAllProducts = async () => {
    setProductLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw Error("Error token");
      }
      const res = await fetch(`${BASE_URL}/${mainUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const response = await res.json();
      console.log(response);
      setAllProducts(response);
    } catch (error) {
      console.error(error);
    } finally {
      setProductLoading(false);
    }
  };
  return { allProducts, handleAllProducts, productLoading };
};
