import React from 'react'
import {StyleSheet,Text,View,Platform} from 'react-native'
import Colors from '../constants/colors'
import TitleText from './TitleText'
const Header = (props) => {
    return (
        <View style={{...styles.header,...Platform.select({
            ios:styles.headerIOS,
            android:styles.headerAndroid
        })}}>
        <TitleText>{props.title}</TitleText>
        </View>
    )
}
const styles=StyleSheet.create({
    header:{
        width:'100%',
        height:90,
        paddingTop:36,
        backgroundColor:Colors.primary,
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:Platform.OS==='ios'?1:0
    },
  
})
export default Header;