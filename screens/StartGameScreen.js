import { TextInput, View, StyleSheet, Alert, Switch, Text } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import colors from "../constants/colors";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

export default function StartGameScreen({ onPickNumber, auto, setAuto, delay, setDelay }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }
  function toggleSwitch() {
    setAuto((previousState) => !previousState);
  }

  function delayChangeHandler(enteredDealy) {
    setDelay(enteredDealy);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    if (auto) {
      console.log(auto);
      if (!delay) {
        Alert.alert("Give delay!", "Please give delay in seconds.", [
          { text: "Okay", style: "default", onPress: resetInputHandler },
        ]);
        return;
      }
    }
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number!", "Number has to be a number between 1 and 99.", [
        { text: "Okay", style: "default", onPress: resetInputHandler },
      ]);
      return;
    }
    onPickNumber(chosenNumber);
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <View style={styles.decisionContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>Auto Give Hint</Text>
          <Switch
            trackColor={{ false: "#767577", true: "green" }}
            thumbColor={auto ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={auto}
          />
        </View>
        {auto && (
          <View style={{ flexDirection: "row", alignItems: "baseline", gap: 10 }}>
            <Text style={{ fontSize: 20 }}>Delay : </Text>
            <TextInput
              keyboardType="number-pad"
              value={delay}
              onChangeText={delayChangeHandler}
              style={styles.delayInput}
            />
            <Text style={{ fontSize: 20 }}>seconds</Text>
          </View>
        )}
      </View>
      <Card>
        <InstructionText>Enter a number</InstructionText>
        <TextInput
          style={styles.numberInput}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={2}
          onChangeText={numberInputHandler}
          value={enteredNumber}
          autoFocus={true}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  decisionContainer: {
    marginTop: 10,
  },
  rootContainer: {
    flex: 1,
    marginTop: 100,
    paddingHorizontal: 30,
  },
  delayInput: {
    height: 30,
    width: 100,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: Colors.accent500,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});

// inputContainer = {
//     marginHorizontal: 24,
//     marginTop: 100,
//     padding: 16,
//     backgroundColor: "#4e0349",
//     borderRadius: 8,
//     justifyContent: "center",
//     // -------for android---------
//     elevation: 4,
//     // ----------for iOS----------
//     // shadowColor: "black",
//     // shadowOffset: { width: 0, height: 2 },
//     // shadowRadius: 6,
//     // shadowOpacity: 0.25,
//   }
