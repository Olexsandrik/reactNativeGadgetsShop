import { BASE_URL } from "@/constants";
import { FormRegister } from "@/types";
import { useState } from "react";

export const useAuth = (mainUrl: string) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const hanlderRegister = async (register: FormRegister) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${mainUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(register),
      });

      if (!response.ok) {
        throw new Error("Register failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { hanlderRegister, data, loading, setData };
};
