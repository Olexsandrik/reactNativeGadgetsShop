import { View, Text } from "react-native";
import React, { ReactElement, ReactNode, useState } from "react";
import { createContext, useContext } from "react";
import { PropsChildren } from "@/types";

type ThemeType = {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
};
const Theme = createContext<ThemeType | undefined>(undefined);
export default function ThemeProvider({ children }: PropsChildren) {
  const [theme, setTheme] = useState<boolean>(false);
  return (
    <Theme.Provider value={{ theme, setTheme }}>{children}</Theme.Provider>
  );
}

export const useThemeContext = (): ThemeType => {
  const context = useContext(Theme);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }

  return context;
};
