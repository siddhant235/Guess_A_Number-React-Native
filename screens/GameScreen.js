import React,{useState,useRef, useEffect} from 'react'
import {View,Text,StyleSheet,Button, Alert,ScrollView,Dimensions} from 'react-native'
import NumberContainer from '../components/NumberContainer'
import * as ScreenOrientation from 'expo-screen-orientation'
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
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    const initialGuess=generateRandomBetween(1,100,props.userChoice)
    const [currentGuess,setCurrentGuess]=useState(initialGuess);
    const [pastGuesses,setPastGuesses]=useState([initialGuess])
    const [availableDeviceWidth,setAvailableDeviceWidth]=useState(Dimensions.get('window').width)
    const [availableDeviceHeight,setAvailableDeviceHeight]=useState(Dimensions.get('window').height)
    const currentLow=useRef(1);
    const currentHigh=useRef(100)
    const {userChoice,onGameOver}=props

    useEffect(()=>{
        const updateLayout=()=>{
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change',updateLayout)
        return ()=>{
            Dimensions.removeEventListener('change',updateLayout)
        }
    })
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

    if(availableDeviceHeight<500)
    {
        return(
            <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
            <View style={styles.controls}>
            <MyButton  onPress={nextGuessHandler.bind(this,'lower')}><Ionicons name="md-remove" size={24} color="white"/></MyButton>
            <NumberContainer>{currentGuess}</NumberContainer>
           <MyButton  onPress={nextGuessHandler.bind(this,'greater')}><Ionicons name="md-add" size={24} color="white"/></MyButton>
          </View>
            <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess,index)=> renderListItem(guess,pastGuesses.length-index))}
                </ScrollView>
             </View>
            </View>
        )
    }
    return (
       <View style={styles.screen}>
           <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
           <NumberContainer>{currentGuess}</NumberContainer>
           <Card style={[...styles.buttonContainer,{marginTop:availableDeviceHeight}]}>
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
    width:300,
    maxWidth:'80%'

},
listContainer:{
    flex:1,
    width:Dimensions.get("window").width>350?'60%':'80%'
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
},
controls:{
    flexDirection:"row",
    justifyContent:'space-around',
    alignItems:'center',
    width:'80%'
}
})
export default GameScreen
