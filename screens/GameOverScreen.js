import React from "react";
import { Text, View, StyleSheet } from "react-native";
const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <Text>Number of rounds:{props.roundsNumber}</Text>
      <Text>Number was:{props.userNumber}</Text>
      <Button title="New Game" onPress={props.newGame}/>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
});

export default GameOverScreen;
