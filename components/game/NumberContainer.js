import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function NumberContainer({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: colors.accent500,
    padding: 10,
    borderRadius: 8,
    margin: 24,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: 36,
    fontFamily: "open-sans-bold",
  },
});
