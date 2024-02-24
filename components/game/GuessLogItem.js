import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";

export default function GuessLogItem({ roundNumber, guess }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{roundNumber}</Text>
      <Text style={styles.itemText}>Opponent's Guess: {guess}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    borderColor: colors.primary800,
    borderRadius: 40,
    paddingVertical: 16,
    paddingHorizontal: 25,
    marginVertical: 8,
    backgroundColor: colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
  },
  itemText: {
    fontFamily: "open-sans",
  },
});
