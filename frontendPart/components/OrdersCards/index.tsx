import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { OrderItem, OrdersCardProps } from "@/types";
import { COLORS } from "@/constants";
import { useRemoveOrderItem } from "@/server/useRemoveOrderItem";

export default function OrdersCard({ item, setAllOrderItem }: OrdersCardProps) {
  const { handleRemoveOrderItem } = useRemoveOrderItem(
    `server/product/${item?.product?.id}/order/${22}`
  );

  const handleRemoveItem = () => {
    setAllOrderItem((prev: OrderItem[]) =>
      prev.filter((it) => it.id !== item.id)
    );
    handleRemoveOrderItem();
  };

  const shortName =
    item.product.name.length > 6
      ? item.product.name.slice(0, 8) + "..."
      : item.product.name;
  return (
    <View style={styles.container}>
      <View style={styles.orderCard}>
        <View>
          <Text style={styles.textOrderCard}>{shortName}</Text>
          <Text>{item.product.price}$</Text>
        </View>

        <View style={styles.removeAndQuantity}>
          <Pressable onPress={handleRemoveItem}>
            {({ pressed }) => (
              <Text
                style={[{ color: pressed ? "red" : "black" }, styles.remove]}
              >
                Remove
              </Text>
            )}
          </Pressable>
          <Text>{item.quantity}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "auto",
    padding: 8,
    width: "100%",
  },
  orderCard: {
    minWidth: "80%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary300,
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#fff",

    shadowOpacity: 0.1,

    marginVertical: 6,
  },
  textOrderCard: {
    fontSize: 15,
    fontWeight: "500",
    width: 150,
    marginBottom: 6,
    color: "#333",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary300,
  },
  removeAndQuantity: {
    padding: 5,
    alignItems: "flex-end",
  },
  remove: {
    marginBottom: 8,
    fontWeight: "500",
    fontSize: 14,
  },
  quantityText: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontWeight: "500",
    textAlign: "center",
  },
});
