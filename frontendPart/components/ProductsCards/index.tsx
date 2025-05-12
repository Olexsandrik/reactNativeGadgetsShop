import {
  View,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function ProductsCarts({ item, styles, theme }: any) {
  const navigation = useNavigation<any>();
  const { width, height } = useWindowDimensions();
  const handlerProduct = (item: any) => {
    navigation.navigate("ScreenProduct", { item });
  };
  return (
    <Pressable onPress={() => handlerProduct(item)}>
      <View
        style={[
          styles.itemContainer,
          { width: (width - 36) / 2 },
          theme ? styles.darkItemContainer : styles.lightItemContainer,
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <Text
            style={[styles.name, theme ? styles.darkText : styles.lightText]}
          >
            {item.name}
          </Text>
          <Text
            style={[styles.price, theme ? styles.darkPrice : styles.lightPrice]}
          >
            ${item.price}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
