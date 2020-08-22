import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderRadius: 5,
    backgroundColor: "white",
    paddingLeft: 16,
    marginBottom: 20,
  },
});

export default function Input({
  placeholder,
  onChangeText,
  autoCorrect,
  secureTextEntry = false,
  value,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      onChangeText={onChangeText}
      autoCorrect={autoCorrect}
      value={value}
      secureTextEntry={secureTextEntry}
    />
  );
}
