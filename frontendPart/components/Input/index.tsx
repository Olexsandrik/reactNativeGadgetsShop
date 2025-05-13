import { View, Text, TextInput } from "react-native";
import React from "react";

import { Controller } from "react-hook-form";
import { InputProps } from "@/types";

export default function Input({
  styles,
  name,
  control,
  placeholder,
  onChangeText,
}: InputProps & { onChangeText?: (text: string) => void }) {
  return (
    <Controller
      name={name}
      rules={{
        required: `${name} is required`,
      }}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextInput
          style={styles}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => {
            onChange(text);
            onChangeText?.(text);
          }}
          placeholderTextColor="#666"
        />
      )}
    />
  );
}
