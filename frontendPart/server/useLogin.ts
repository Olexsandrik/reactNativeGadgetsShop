import { useAuthContext } from "@/components/Context/AuthContext";
import { BASE_URL } from "@/constants";
import { useState } from "react";

export const useLogin = (mainUrl: string) => {
  const [loading, setLoading] = useState(false);
  const { user, login, logout } = useAuthContext();
  const hanlderLogin = async (loginData: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${mainUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Register failed");
      }

      const res = await response.json();
      await login({
        token: res.token,
        userData: res.user,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return { hanlderLogin, loading };
};
