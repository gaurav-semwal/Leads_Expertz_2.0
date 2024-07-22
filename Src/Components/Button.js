import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../Comman/Styles'

const Button = ({ text }) => {
  return (
    <View style={styles.container}>
    <View style={styles.Button}>
    <Text style={styles.text}>{text}</Text>
    </View>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    Button:{
        height:48,
        width:'85%',
        alignItems: 'center',
        backgroundColor:Colors.Button,
        borderRadius:50,
        justifyContent: 'center',
        alignSelf: 'center',
        bottom: '40%',
    },
    text:{
        color:'white',
        fontSize:14,
        fontWeight:'500'
    }
})