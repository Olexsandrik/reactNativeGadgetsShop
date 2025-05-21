import { View, Text } from "react-native";
import React, { createContext, useContext, useState } from "react";
import { PropsChildren } from "@/types";

const AddUserInfo = createContext({});

export default function AddUserInfoContext({ children }: PropsChildren) {
  const [userInfo, setUserInfo] = useState<any>(null);
  return (
    <AddUserInfo.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AddUserInfo.Provider>
  );
}

export const AddInfoContext = () => {
  const context = useContext(AddUserInfo);
  if (!context) {
    throw new Error("Error add info user");
  }
  return context;
};
