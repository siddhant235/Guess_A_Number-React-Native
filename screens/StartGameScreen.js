import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
const StartGameScreen = (props) => {
  return (
    <View style={styles.screens}>
           
      <Text style={styles.title}>Start A New Game !</Text>
      <View style={styles.inputContainer}>
        <Text>Select A Number</Text>
        <TextInput />
        <View style={styles.buttonContainer}>
        <Button title="Reset" onPress={() => {}} />
          <Button title="Confirm" onPress={() => {}} />
        </View>
      </View>
    </View>
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
    shadowColor:'black',
    shadowOffset:{
        width:0,
        height:6
    },
    elevation:6,
    shadowOpacity:0.26,
    backgroundColor:'white',
    borderRadius:10
    
  },
});
export default StartGameScreen;
