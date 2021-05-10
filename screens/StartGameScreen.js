import React,{useState} from "react";
import { Button, StyleSheet, Text, TextInput, View,TouchableWithoutFeedback,Keyboard } from "react-native";
import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
const StartGameScreen = (props) => {
  const [enteredValue,setEnteredValue]=useState('')
  const numberInputHandler=(number)=>{
    setEnteredValue(number.replace(/[^0-9]/g),'');
  
  }
  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
    <View style={styles.screens}>
           
      <Text style={styles.title}>Start A New Game !</Text>
      <Card style={styles.inputContainer}>
        <Text>Select A Number</Text>
        <Input style={styles.input} blurOnSubmit autoCorrect={false} keyboardType="numeric" maxLength={2} onChangeText={numberInputHandler}
        value={enteredValue}/>
        <View style={styles.buttonContainer}>
      <View style={styles.button}><Button title="Reset" onPress={() => {}} color={Colors.accent}/></View>
         <View style={styles.button}><Button title="Confirm" onPress={() => {}} color={Colors.primary}/></View>
        </View>
      </Card>
    </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  screens: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
color:'black',
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical:10
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
   
  },
  button:{
    width:100
  },
  input:{
    width:50,
    textAlign:'center'
  }
});
export default StartGameScreen;
