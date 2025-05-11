import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
import { useCatalog } from "@/server/useCatalog";
import Spinner from "react-native-loading-spinner-overlay";
import { useAllProduct } from "@/server/useAllProduct";
import { set } from "react-hook-form";

export default function ListOfGoods({ navigation }: any) {
  const { width, height } = useWindowDimensions();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const { catalog, loading, handleGetCategories, setCatalog } = useCatalog(
    `server/getAllCategories`
  );
  const { allProducts, handleAllProducts, productLoading } =
    useAllProduct("server/products");

  const handlerProduct = (item: any) => {
    navigation.navigate("ScreenProduct", { item });
  };

  const handleSmartPhone = async () => {
    await handleGetCategories(1);
  };
  const handleSmartLaptops = async () => {
    await handleGetCategories(2);
  };
  const handleSmartAccessories = async () => {
    await handleGetCategories(3);
  };
  const hanldeAllProducts = async () => {
    setCatalog([]);
    await handleAllProducts();
  };

  useEffect(() => {
    setCatalog([]); 
    handleAllProducts(); 
  }, []);

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <View
        style={[
          styles.headerWrapper,
          isDarkMode ? styles.darkHeaderWrapper : styles.lightHeaderWrapper,
        ]}
      >
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={{
                uri: "https://sdmntprnortheu.oaiusercontent.com/files/00000000-691c-61f4-878f-aebdef03eade/raw?se=2025-05-11T11%3A57%3A31Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=76024c37-11e2-4c92-aa07-7e519fbe2d0f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-11T07%3A01%3A04Z&ske=2025-05-12T07%3A01%3A04Z&sks=b&skv=2024-08-04&sig=xkB6/JbEPj7FzRD3f62EG0RgR7cc7%2BBgv4fU/nEr9eo%3D",
              }}
            />
          </View>

          <View style={styles.searchContainer}>
            <View
              style={[
                styles.inputContainer,
                isDarkMode
                  ? styles.darkInputContainer
                  : styles.lightInputContainer,
              ]}
            >
              <Image
                source={require("../../assets/images/search.png")}
                style={[
                  styles.icon,
                  isDarkMode ? styles.darkIcon : styles.lightIcon,
                ]}
                resizeMode="contain"
              />
              <TextInput
                placeholder="Search products..."
                placeholderTextColor={isDarkMode ? "#a8b5db" : "#6b7280"}
                style={[
                  styles.input,
                  isDarkMode ? styles.darkInput : styles.lightInput,
                ]}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text
              style={[
                styles.filterText,
                isDarkMode ? styles.darkFilterText : styles.lightFilterText,
              ]}
            >
              Filter
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-around",
          }}
        >
          <Button title="All" onPress={hanldeAllProducts} />
          <Button title="Smartphones" onPress={handleSmartPhone} />
          <Button title="Laptops" onPress={handleSmartLaptops} />
          <Button title="Accessories" onPress={handleSmartAccessories} />
        </ScrollView>
      </View>

      {loading ? (
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      ) : (
        <FlatList
          data={catalog?.products || allProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <Pressable onPress={() => handlerProduct(item)}>
              <View
                style={[
                  styles.itemContainer,
                  { width: (width - 36) / 2 },
                  isDarkMode
                    ? styles.darkItemContainer
                    : styles.lightItemContainer,
                ]}
              >
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                </View>
                <View style={styles.infoContainer}>
                  <Text
                    style={[
                      styles.name,
                      isDarkMode ? styles.darkText : styles.lightText,
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      styles.price,
                      isDarkMode ? styles.darkPrice : styles.lightPrice,
                    ]}
                  >
                    ${item.price}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  lightContainer: {
    backgroundColor: "#f5f5f7",
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 80,
    borderRadius: 10,
  },
  logoText: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  darkText: {
    color: "#ffffff",
  },
  lightText: {
    color: "#333333",
  },
  searchContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 44,
  },
  darkInputContainer: {
    backgroundColor: "#2a2a2a",
  },
  lightInputContainer: {
    backgroundColor: "#f2f2f7",
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  darkIcon: {
    tintColor: "#ab8bff",
  },
  lightIcon: {
    tintColor: "#7c4dff",
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: "100%",
    padding: 0,
  },
  darkInput: {
    color: "#ffffff",
  },
  lightInput: {
    color: "#333333",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#7c4dff",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  darkFilterText: {
    color: "#ffffff",
  },
  lightFilterText: {
    color: "#ffffff",
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  list: {
    padding: 10,
    alignItems: "center",
  },
  itemContainer: {
    marginBottom: 16,
    marginLeft: 5,
    borderRadius: 12,
    overflow: "hidden",
  },
  darkItemContainer: {
    backgroundColor: "#1e1e1e",
  },
  lightItemContainer: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
  },
  darkPrice: {
    color: "#ab8bff",
  },
  lightPrice: {
    color: "#7c4dff",
  },
});
