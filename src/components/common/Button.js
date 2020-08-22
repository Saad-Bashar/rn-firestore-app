import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 50,
  },

  btnText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
    lineHeight: 18,
  },
});

export default function Button({ icon, title, customStyles, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, customStyles]}
    >
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}
