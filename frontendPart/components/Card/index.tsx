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
  TextInput,
} from "react-native";
import Input from "../Input";
import AuthContext, { useAuthContext } from "../Context/AuthContext";

export default function Card({
  route,
  navigation,
}: NativeStackScreenProps<PropsNavigationProducts, "ScreenProduct">) {
  const { item } = route.params;

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

  const handleAddToCart = () => {
    console.log("Add to cart:", item);
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

          <TouchableOpacity
            style={styles.buyButton}
            onPress={handleAddToCart}
            activeOpacity={0.7}
          >
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
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
