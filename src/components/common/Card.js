import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: "#dddd",
    borderRadius: 12,
    backgroundColor: "white",

    // android
    elevation: 2,

    // ios
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default function Card({ children, customStyle }) {
  return <View style={[styles.wrapper, customStyle]}>{children}</View>;
}
