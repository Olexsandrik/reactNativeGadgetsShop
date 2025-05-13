import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import Categories from "../Categories";
import { useCatalog } from "@/server/useCatalog";
import { useAllProduct } from "@/server/useAllProduct";
import Header from "../Header";
import Cards from "../Cards";
import Spinner from "react-native-loading-spinner-overlay";
import { useForm } from "react-hook-form";

export default function Search() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>("desc");
  const [activeSource, setActiveSource] = useState<"all" | "catalog">("all");

  const { catalog, loading, handleGetCategories, setCatalog } = useCatalog(
    `server/getAllCategories`
  );

  const [theme, setTheme] = useState(false);
  const { allProducts, fetchProducts, productLoading, setAllProducts } =
    useAllProduct("server/products");
  const handleSmartPhone = async () => {
    setCatalog(null);
    setActiveSource("catalog");
    await handleGetCategories(1);
  };
  const handleSmartLaptops = async () => {
    setCatalog(null);
    setActiveSource("catalog");
    await handleGetCategories(2);
  };
  const handleSmartAccessories = async () => {
    setCatalog(null);
    setActiveSource("catalog");
    await handleGetCategories(3);
  };
  const hanldeAllProducts = async () => {
    setCatalog(null);
    setActiveSource("all");
    await fetchProducts();
  };

  const minMaxPrice = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    if (activeSource === "all") {
      setAllProducts((prev) => {
        return [...prev].sort((a, b) => {
          return newOrder === "asc" ? a.price - b.price : b.price - a.price;
        });
      });
    }
    if (activeSource === "catalog") {
      setCatalog((prev: any) => {
        const sorted = [...(prev.products || [])].sort((a, b) => {
          return newOrder === "asc" ? a.price - b.price : b.price - a.price;
        });

        return {
          ...prev,
          products: sorted,
        };
      });
    }
  };

  useEffect(() => {
    setCatalog(null);

    fetchProducts();
  }, []);

  const { control, reset, watch } = useForm<{ search: string }>({
    defaultValues: {
      search: "",
    },
  });
  const search = watch("search");

  const allSortedProducts = search.trim()
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : allProducts;

  const catalogSorted = catalog
    ? {
        id: catalog.id,
        name: catalog.name,
        products: search.trim()
          ? catalog.products?.filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase())
            )
          : catalog.products,
      }
    : null;

  return (
    <View style={styles.darkContainer}>
      <View
        style={[
          styles.headerWrapper,
          theme ? styles.darkHeaderWrapper : styles.lightHeaderWrapper,
        ]}
      >
        <Header
          control={control}
          nameInput={"search"}
          theme={theme}
          minMaxPrice={minMaxPrice}
        />

        <Categories
          hanldeAllProducts={hanldeAllProducts}
          handleSmartPhone={handleSmartPhone}
          handleSmartLaptops={handleSmartLaptops}
          handleSmartAccessories={handleSmartAccessories}
        />
      </View>

      <Cards
        catalog={catalogSorted}
        activeSource={activeSource}
        allProducts={allSortedProducts}
        theme={theme}
        productLoading={productLoading}
        fetchProducts={fetchProducts}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 48,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  darkInputContainer: {
    backgroundColor: "#2a2a2a",
    borderWidth: 1,
    borderColor: "#3a3a3a",
  },
  lightInputContainer: {
    backgroundColor: "#f2f2f7",
    borderWidth: 1,
    borderColor: "#e5e5ea",
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  darkIcon: {
    tintColor: "#ab8bff",
  },
  lightIcon: {
    tintColor: "#7c4dff",
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: "100%",
    padding: 0,
  },
  darkInput: {
    color: "#ffffff",
  },
  lightInput: {
    color: "#333333",
  },
  clearButton: {
    padding: 4,
  },
  clearIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  darkClearIcon: {
    backgroundColor: "#3a3a3a",
  },
  lightClearIcon: {
    backgroundColor: "#e5e5ea",
  },
  clearIconText: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: "center",
  },
  darkClearIconText: {
    color: "#a8b5db",
  },
  lightClearIconText: {
    color: "#6b7280",
  },
  headerWrapper: {
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  darkHeaderWrapper: {
    backgroundColor: "#1a1a1a",
    borderBottomColor: "#333",
  },
  lightHeaderWrapper: {
    backgroundColor: "#ffffff",
    borderBottomColor: "#e5e7eb",
  },
});
