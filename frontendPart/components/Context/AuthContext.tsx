import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginPropsLogin, PropsChildren, User } from "@/types";
import { BASE_URL } from "@/constants";
import { useNavigation } from "@react-navigation/native";

const authChange = createContext({});
export default function AuthContext({ children }: PropsChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async ({ token, userData }: LoginPropsLogin) => {
    await AsyncStorage.setItem("token", token);
    setUser(userData);

  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/server/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        await AsyncStorage.removeItem("token");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  return (
    <authChange.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </authChange.Provider>
  );
}
export const useAuthContext = (): any => {
  const context = useContext(authChange);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");

  return context;
};
