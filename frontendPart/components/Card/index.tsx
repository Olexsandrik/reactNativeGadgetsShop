import type { PropsNavigationProducts } from "@/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Input from "../Input";
import { useAuthContext } from "../Context/AuthContext";
import { usePostOrders } from "@/server/usePostOrders";
import { useRemoveOrderItem } from "@/server/useRemoveOrderItem";
import { useOrderItemContext } from "../Context/OrderContextProvider";

export default function Card({
  route,
}: NativeStackScreenProps<PropsNavigationProducts, "ScreenProduct">) {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [showRemoveButton, setShowRemoveButton] = useState(true);

  const { user } = useAuthContext();
  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      commentItem: "",
    },
  });
  const [commentData, setCommentData] = useState<any>([]);
  const { setOrderData }: any = useOrderItemContext();
  const { handleAddOrder, orderInfo, loading } = usePostOrders("server/orders");

  const { handleRemoveOrderItem } = useRemoveOrderItem(
    `server/product/${item.id}/order/${orderInfo?.orderId}`
  );

  const handleAddToCart = async () => {
    const actualData = await handleAddOrder({
      productId: item.id,
      quantity: quantity,
    });
    setOrderData(actualData);

    setShowRemoveButton(false);
  };

  const handleRemoveFromCart = () => {
    handleRemoveOrderItem();
    setShowRemoveButton(true);
  };

  const handleAddComment = (data: any) => {
    setCommentData((prev: any) => {
      return {
        ...prev,
        user,
        comment: [...(prev?.comment || []), { name: data.commentItem }],
      };
    });

    reset();
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.card} activeOpacity={0.9}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>

          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decrementQuantity}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {showRemoveButton && (
            <TouchableOpacity
              style={styles.buyButton}
              onPress={handleAddToCart}
              activeOpacity={0.7}
            >
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
          )}

          {!showRemoveButton && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemoveFromCart}
              activeOpacity={0.7}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.commentsSection}>
        <View style={styles.commentsHeader}>
          <Text style={styles.commentsTitle}>Comments</Text>
        </View>
        <View style={styles.commentsList}>
          <ScrollView>
            {commentData?.comment ? (
              <View>
                {commentData?.comment?.map((it: any, index: number) => {
                  return (
                    <View key={index} style={styles.commentItem}>
                      <View style={styles.commentHeader}>
                        <Text style={styles.commentUser}>
                          {user?.name || "Anonymous User"}
                        </Text>
                        <Text style={styles.commentDate}>
                          {new Date().toLocaleDateString()}
                        </Text>
                      </View>
                      <Text style={styles.commentText}>{it.name}</Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={styles.emptyCommentContainer}>
                <Text style={styles.noComments}>
                  No comments yet. Be the first to comment!
                </Text>
              </View>
            )}
          </ScrollView>
        </View>

        <View style={styles.addCommentContainer}>
          <Input
            styles={styles.commentInput}
            placeholder="Add a comment..."
            control={control}
            name="commentItem"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSubmit(handleAddComment)}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  card: {
    backgroundColor: "#222222",
    borderRadius: 12,
    overflow: "hidden",
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: "90%",
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  price: {
    color: "#5856D6",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color: "#CCCCCC",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  quantityLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 10,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333333",
    borderRadius: 8,
  },
  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444444",
    borderRadius: 8,
  },
  quantityButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityValue: {
    color: "#FFFFFF",
    fontSize: 16,
    paddingHorizontal: 16,
    minWidth: 40,
    textAlign: "center",
  },
  buyButton: {
    backgroundColor: "#5856D6",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  removeButton: {
    backgroundColor: "#D65856",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  removeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  commentsSection: {
    backgroundColor: "#222222",
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
    padding: 16,
  },
  commentsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  commentsTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  commentsList: {
    marginBottom: 16,
    maxHeight: 300,
  },
  commentItem: {
    backgroundColor: "#333333",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#5856D6",
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center",
  },
  commentUser: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  commentDate: {
    color: "#999999",
    fontSize: 12,
  },
  commentText: {
    color: "#EEEEEE",
    fontSize: 14,
    lineHeight: 20,
  },
  noComments: {
    color: "#999999",
    textAlign: "center",
    fontStyle: "italic",
    padding: 16,
  },
  emptyCommentContainer: {
    backgroundColor: "#333333",
    borderRadius: 8,
    padding: 16,
    opacity: 0.7,
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333333",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  commentInput: {
    flex: 1,
    color: "#FFFFFF",
    paddingVertical: 10,
    minHeight: 40,
  },
  sendButton: {
    padding: 10,
    backgroundColor: "#5856D6",
    borderRadius: 6,
    marginLeft: 8,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
