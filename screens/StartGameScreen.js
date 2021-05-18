import React, { useState,useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import MyButton from '../components/MyButton'
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [buttonWidth,setButtonWidth]=useState(Dimensions.get("window").width/4)
 
  
  const numberInputHandler = (number) => {
    setEnteredValue(number.replace(/[^0-9]/g), "");
  };
  const resetInputhandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };
  useEffect(() => {
    const updateLayout=()=>{
      setButtonWidth(Dimensions.get('window').width/4)
      Dimensions.addEventListener('change',updateLayout)
    }
    return () => {
      Dimensions.removeEventListener('change',updateLayout)
    }
  })
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid Number!",
        "Number has to be a  number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputhandler }]
      );
      return;
    }
    setSelectedNumber(chosenNumber);
    setConfirmed(true);
    setEnteredValue("");
    Keyboard.dismiss();
  };
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MyButton
          onPress={() => props.onStartGame(selectedNumber)}
        >START GAME</MyButton>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screens}>
        <TitleText style={styles.title}>Start A New Game !</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select A Number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={{width:buttonWidth}}>
              <Button
                title="Reset"
                onPress={resetInputhandler}
                color={Colors.accent}
              />
            </View>
            <View style={{width:buttonWidth}}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screens: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    marginVertical: 5,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
    padding: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    color: "black",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  inputContainer: {
    width: 300,
    // maxWidth: "80%",
    maxWidth:'95%',
    alignItems: "center",
  },
  button: {
    // width: 100,
    width:Dimensions.get('window').width/4
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  text: {
    fontFamily: "open-sans-bold",
  },
});
export default StartGameScreen;
