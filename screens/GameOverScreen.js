import React from "react";
import { Text, View, StyleSheet,Button,Image } from "react-native";
import BodyText from '../components/BodyText'
import TitleText from '../components/BodyText'
const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
      <Image source={require('../assets/success.png')} style={styles.image} 
      //source={{uri:abc.com}}
      resizeMode="cover"/>
      </View>
      <BodyText>Number of rounds:{props.roundsNumber}</BodyText>
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
  image:{
    width:'100%',
    height:'100%'
  },
  imageContainer:{
    width:300,
    height:300,
    borderRadius:150,
    borderWidth:2,
    borderColor:'black',
    overflow:"hidden",
    marginVertical:30
  }
});

export default GameOverScreen;
