import { Text, StyleSheet, Platform } from "react-native";

export default function Title({ children, style }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontFamily: "open-sans-bold",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderWidth: Platform.select({ ios: 2, android: 0 }),
    borderColor: "white",
    padding: 12,
  },
});
