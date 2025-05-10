import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsChildren } from "@/types";
import { BASE_URL } from "@/constants";
const authChange = createContext({});
export default function AuthContext({ children }: PropsChildren) {
  const [user, setUser] = useState(null);
  const login = async ({ token, userData }: any) => {
    await AsyncStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");

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
