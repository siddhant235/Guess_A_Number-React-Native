import React,{useState,useRef, useEffect} from 'react'
import {View,Text,StyleSheet,Button, Alert,ScrollView} from 'react-native'
import NumberContainer from '../components/NumberContainer'
import {Ionicons} from '@expo/vector-icons'
import Card from '../components/Card'
import MyButton from '../components/MyButton'
import BodyText from '../components/BodyText'
import DefaultStyles from '../constants/default-styles'
const generateRandomBetween=(min,max,exclude)=>{
    min=Math.ceil(min);
    max=Math.floor(max);
    const rndNum=Math.floor(Math.random()*(max-min))+min;
    if(rndNum===exclude){
        return generateRandomBetween(min,max,exclude);
    }
    else{
        return rndNum;
    }
}
const renderListItem=(value,numofRound)=>{
    return <View key={value} style={styles.listItem}>
        <BodyText>#{numofRound} </BodyText>
        <BodyText>{value}</BodyText>
        </View>

}
const GameScreen = (props) => {
    const initialGuess=generateRandomBetween(1,100,props.userChoice)
    const [currentGuess,setCurrentGuess]=useState(initialGuess);
    const [pastGuesses,setPastGuesses]=useState([initialGuess])
    const currentLow=useRef(1);
    const currentHigh=useRef(100)
    const {userChoice,onGameOver}=props
    useEffect(()=>{
if(currentGuess===userChoice)
{
   onGameOver(pastGuesses.length);    
}
    },[currentGuess,userChoice,onGameOver])
    const nextGuessHandler=(direction)=>{
      if(direction==='lower' && currentGuess<props.userChoice || direction==='greater' && currentGuess>props.userChoice)
      {
     Alert.alert('Don\'t lie!','You know that this is wrong...',[{text:'Sorry!',style:'cancel'}])
      }
      if(direction==='lower'){
    currentHigh.current=currentGuess;
      }else{
          currentLow.current=currentGuess+1
      }
   const nextNumber= generateRandomBetween(currentLow.current,currentHigh.current,currentGuess)
   setCurrentGuess(nextNumber)
//    setRounds(curRound=>curRound+1);
setPastGuesses(curPastGuesses=>[nextNumber,...curPastGuesses])
    }
    return (
       <View style={styles.screen}>
           <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
           <NumberContainer>{currentGuess}</NumberContainer>
           <Card style={styles.buttonContainer}>
               <MyButton  onPress={nextGuessHandler.bind(this,'lower')}><Ionicons name="md-remove" size={24} color="white"/></MyButton>
               <MyButton  onPress={nextGuessHandler.bind(this,'greater')}><Ionicons name="md-add" size={24} color="white"/></MyButton>
           </Card>
           <View style={styles.listContainer}>
           <ScrollView contentContainerStyle={styles.list}>
               {pastGuesses.map((guess,index)=> renderListItem(guess,pastGuesses.length-index))}
               </ScrollView>
            </View>
           </View>
    )
}
const styles=StyleSheet.create({
screen:{
    flex:1,
    padding:10,
    alignItems:'center'
},
buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:20,
    width:300,
    maxWidth:'80%'

},
listContainer:{
    flex:1,
    width:"60%"
},
list:{
    flexGrow:1,
alignItems:'center',
justifyContent:'flex-end'
},
listItem:{
    borderColor:"#ccc",
    borderWidth:1,
    padding:15,
    marginVertical:10,
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%'
}
})
export default GameScreen
