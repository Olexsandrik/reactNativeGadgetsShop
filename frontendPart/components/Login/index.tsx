import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";

import { LoginProps, PropsLogin } from "@/types";
import { useForm } from "react-hook-form";
import Input from "../Input";

export default function Login({ route, navigation }: PropsLogin) {
  const handleRegister = () => {
    navigation.navigate("register");
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginProps) => {
    console.log(data);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Welcome to CoolCompany</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <Input
            control={control}
            name="email"
            placeholder="Enter you email"
            styles={styles.input}
          />

          {errors.email ? (
            <Text
              style={{
                color: "red",
              }}
            >
              {errors.email.message}
            </Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <Input
            control={control}
            name="password"
            placeholder="Enter you password"
            styles={styles.input}
          />

          {errors.password ? (
            <Text
              style={{
                color: "red",
              }}
            >
              {errors.password.message}
            </Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.footerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    padding: 40,
  },

  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
  },
  form: {
    flex: 1,
    maxWidth: 370,
    width: "100%",
    alignSelf: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    padding: 15,
    color: "#fff",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#a855f7",
    textAlign: "right",
    marginBottom: 30,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#a855f7",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#aaa",
    fontSize: 14,
  },
  footerLink: {
    color: "#a855f7",
    fontSize: 14,
    fontWeight: "bold",
  },
});
