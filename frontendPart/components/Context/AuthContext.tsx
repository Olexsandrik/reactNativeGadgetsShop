import { View, Text } from "react-native";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginPropsLogin, PropsChildren, User } from "@/types";
import { BASE_URL } from "@/constants";

const authChange = createContext({});
export default function AuthContext({ children }: PropsChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingRefresh, setLoadingRefresh] = useState(false);

  const [initialLoading, setInitialLoading] = useState(false);

  const login = async ({ token, userData }: LoginPropsLogin) => {
    await AsyncStorage.setItem("token", token);
    setUser(userData);

    await refreshUser();
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  const structredForToken = async () => {
    const token = await AsyncStorage.getItem("token");
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
  };
  const checkToken = async () => {
    setInitialLoading(true);
    try {
      await structredForToken();
    } catch (err) {
      console.error(err);
    } finally {
      setInitialLoading(false);
    }
  };

  const refreshUser = async () => {
    setLoadingRefresh(true);
    try {
      await structredForToken();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingRefresh(false);
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
        loadingRefresh,
        initialLoading,
        checkToken,
        refreshUser,
        setUser,
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
