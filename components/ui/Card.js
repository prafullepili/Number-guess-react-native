import { View, StyleSheet } from "react-native";

export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 24,
    marginTop: 36,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
});
