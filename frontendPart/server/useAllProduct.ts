import { BASE_URL } from "@/constants";
import { AsyncLocalStorage } from "async_hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { error } from "console";

export const useAllProduct = (mainUrl: string) => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [productLoading, setProductLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 10;

  const fetchProducts = async () => {
    if (productLoading || !hasMore) return;

    setProductLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/${mainUrl}?page=${page}&limit=${LIMIT}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await res.json();

      setAllProducts((prev) => [...prev, ...response.data]);
      setPage((prev) => prev + 1);

      if (page >= response.meta.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProductLoading(false);
    }
  };

  return { allProducts, fetchProducts, productLoading, setAllProducts };
};
