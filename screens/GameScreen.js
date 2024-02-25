import { View, StyleSheet, Alert, Text } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Title from "../components/ui/Title";
import { useCallback, useEffect, useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import GuessLogItem from "../components/game/GuessLogItem";

// function generateRandomBetween(min, max, exclude) {
//   const rndNum = Math.floor(Math.random() * (max - min)) + min;
//   if (rndNum === exclude) {
//     return generateRandomBetween(min, max, exclude);
//   } else {
//     return rndNum;
//   }
// }

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  return rndNum;
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ userNumber, onGameOver, auto, delay }) {
  const [currentGuess, setCurrentGuess] = useState();
  const [guessRounds, setGuessRounds] = useState([]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
    const initialGuess = generateRandomBetween(minBoundary, maxBoundary, userNumber);
    setCurrentGuess(initialGuess);
    setGuessRounds([initialGuess]);
    console.log("Called generateRandom to set initialGuess number");
  }, []);

  useEffect(() => {
    if (currentGuess && auto) {
      setTimeout(() => {
        if (currentGuess > userNumber) {
          nextGuessHandler("lower");
        } else {
          nextGuessHandler("greater");
        }
      }, delay * 1000);
    }
    // console.log("currentGuess--->", currentGuess);
    // console.log("userNumber--->", userNumber);
    // console.log(`min -> ${minBoundary} || max -> ${maxBoundary}`);
    // console.log();
    // console.log("-----------------------------------------------");
  }, [currentGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
      console.log("Game Over");
    }
  }, [currentGuess, userNumber, onGameOver]);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevState) => [newRndNumber, ...prevState]);
  }

  const guessRoundsListLength = guessRounds.length;
  return (
    <View style={styles.screen}>
      <Title style={{ borderWidth: 0 }}>Oppenent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      {!auto && (
        <Card style={{ marginBottom: 15 }}>
          <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler("lower")}>
                <Ionicons name="remove" size={24} color="white" />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler("greater")}>
                <Ionicons name="add" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </Card>
      )}
      <View style={styles.listContainer}>
        <FlatList
          style={{ marginVertical: 10, paddingHorizontal: 20 }}
          data={guessRounds}
          keyExtractor={(item) => item}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            ></GuessLogItem>
          )}
        />
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
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});
