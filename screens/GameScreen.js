import { Text, View, StyleSheet } from "react-native";
import Title from "../components/Title";

export default function GameScreen() {
  return (
    <View style={styles.screen}>
      <Title>Oppenent's Guess</Title>
      <Text>GUESS</Text>
      <View>
        <Text>Higher or lower?</Text>
      </View>
      <View>
        <Text>LOG ROUNDS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 40,
    padding: 24,
  },
});
