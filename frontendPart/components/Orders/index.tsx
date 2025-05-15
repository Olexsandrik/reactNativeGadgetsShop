import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function Orders() {
  const orders = [
    {
      id: "1",
      orderNumber: "#ORD-2025-001",
      date: "15 May 2025",
      items: 3,
      total: "$299.99",
      status: "Delivered",
    },
    {
      id: "2",
      orderNumber: "#ORD-2025-002",
      date: "10 May 2025",
      items: 1,
      total: "$149.50",
      status: "Processing",
    },
    {
      id: "3",
      orderNumber: "#ORD-2025-003",
      date: "5 May 2025",
      items: 2,
      total: "$89.99",
      status: "Shipped",
    },
    {
      id: "4",
      orderNumber: "#ORD-2025-004",
      date: "1 May 2025",
      items: 4,
      total: "$459.95",
      status: "Delivered",
    },
  ];

  const renderOrderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.orderItem}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderNumber}>{item.orderNumber}</Text>
        <Text style={styles.orderStatus}>{item.status}</Text>
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.orderDate}>{item.date}</Text>
        <Text style={styles.orderItemCount}>
          {item.items} {item.items === 1 ? "item" : "items"}
        </Text>
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.orderTotalLabel}>Total:</Text>
        <Text style={styles.orderTotal}>{item.total}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {orders.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No orders yet</Text>
          </View>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={renderOrderItem}
            contentContainerStyle={styles.ordersList}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  headerTitle: {
    color: "#8a56ff",
    fontSize: 18,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  ordersList: {
    padding: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
    fontSize: 16,
  },
  orderItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "600",
  },
  orderStatus: {
    fontSize: 14,
    color: "#8a56ff",
    fontWeight: "500",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
  },
  orderItemCount: {
    fontSize: 14,
    color: "#666",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  orderTotalLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: "700",
    color: "#8a56ff",
  },
  bottomNav: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#000",
    borderTopWidth: 1,
    borderTopColor: "#222",
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navSymbol: {
    fontSize: 18,
    color: "#666",
  },
  activeNavSymbol: {
    color: "#8a56ff",
  },
  navLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  activeNavLabel: {
    color: "#8a56ff",
  },
});
