import React from 'react'
import {View,StyleSheet,Text,TouchableOpacity,TouchableNativeFeedback,Platform} from 'react-native'
import Colors from '../constants/colors'
const MyButton = (props) => {
 
    
    return (
     
        <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
       <View style={styles.button}>
           <Text style={styles.buttonText}>{props.children}</Text>
           </View>
           </TouchableOpacity>
       
           
    )
}
const styles=StyleSheet.create({
buttonContainer:{
borderRadius:25,
overflow:'hidden'
    },
button:{
backgroundColor:Colors.primary,
paddingVertical:12,
paddingHorizontal:30,
borderRadius:25
},
buttonText:{
    color:'white',
}
})
export default MyButton
