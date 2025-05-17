import React from "react";

import ThemeProvider from "./components/Context";

import RootNavigator from "./components/RootNavigator";

import AuthContext from "./components/Context/AuthContext";
import OrderContextProvider from "./components/Context/OrderContextProvider";
export default function App() {
  return (
    <AuthContext>
      <ThemeProvider>
        <OrderContextProvider>
          <RootNavigator />
        </OrderContextProvider>
      </ThemeProvider>
    </AuthContext>
  );
}
