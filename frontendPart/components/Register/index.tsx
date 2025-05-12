import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { FormRegister, PropsRegister } from "@/types";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { useAuth } from "@/server/useAuth";

export default function Register({ navigation }: PropsRegister) {
  const handleRegister = () => {
    navigation.navigate("login");
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormRegister>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { hanlderRegister } = useAuth("server/register");
  const onSubmit = async (data: FormRegister) => {
    if (data) {
      await hanlderRegister(data);

      console.log(data);
      navigation.navigate("login");
    }

    return;
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <Input
              control={control}
              name="name"
              placeholder="Enter you name"
              styles={styles.input}
            />

            {errors.name ? (
              <Text
                style={{
                  color: "red",
                }}
              >
                {errors.name.message}
              </Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>

            <Input
              control={control}
              name="email"
              styles={styles.input}
              placeholder="Enter your email"
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
              styles={styles.input}
              placeholder="Create a password"
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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#666"
              secureTextEntry
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
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.footerLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    alignContent: "center",
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
  button: {
    backgroundColor: "#a855f7",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
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
    marginBottom: 40,
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
