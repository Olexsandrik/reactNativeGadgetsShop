import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useAuthContext } from "../Context/AuthContext";
import { useThemeContext } from "../Context";
import { COLORS } from "@/constants";

export default function UserInfo() {
  const { user } = useAuthContext();
  const { theme } = useThemeContext();

  console.log(theme);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.userInfo,
          { borderColor: theme ? COLORS.primary900 : COLORS.appBackground },
        ]}
      >
        <View>
          <Text
            style={[
              styles.userName,
              {
                color: theme ? COLORS.grey300 : COLORS.appBackground,
              },
            ]}
          >
            {user.name}
          </Text>
          <Text
            style={[
              styles.userEmail,
              {
                color: theme ? COLORS.grey300 : COLORS.appBackground,
              },
            ]}
          >
            {user.email}
          </Text>
        </View>
        <View>
          <Text
            style={[
              styles.userName,
              {
                color: theme ? COLORS.grey300 : COLORS.appBackground,
              },
            ]}
          >
            name
          </Text>
          <Text
            style={[
              styles.userEmail,
              {
                color: theme ? COLORS.grey300 : COLORS.appBackground,
              },
            ]}
          >
            email
          </Text>
        </View>
      </View>

      <ScrollView style={styles.orders} showsVerticalScrollIndicator={false}>
        {user.orders?.map((order: any) => (
          <View key={order.id} style={styles.orderContainer}>
            <Text style={styles.orderTitle}>Order:</Text>
            {order.items?.map((item: any, index: number) => (
              <View
                key={index}
                style={[
                  styles.itemCard,
                  {
                    borderColor: theme
                      ? COLORS.primary900
                      : COLORS.appBackground,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.itemName,
                    {
                      color: theme ? COLORS.grey300 : COLORS.appBackground,
                    },
                  ]}
                >
                  {item.product.name}
                </Text>
                <Text
                  style={[
                    styles.itemPrice,
                    {
                      color: theme ? COLORS.grey300 : COLORS.appBackground,
                    },
                  ]}
                >
                  ${item.product.price}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  userInfo: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.6,
  },
  orders: {
    flex: 1,
  },
  orderContainer: {
    marginBottom: 16,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  itemCard: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 14,
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
  },
});
//  <View style={styles.orders}>
//         {user.orders?.map((order: any) => {
//           return order?.items?.map((item: any, index: any) => {
//             return (
//               <View key={item.id}>
//                 <Text>{item.product.name}</Text>
//                 <Text>{item.product.price}</Text>
//               </View>
//             );
//           });
//         })}
//       </View>
