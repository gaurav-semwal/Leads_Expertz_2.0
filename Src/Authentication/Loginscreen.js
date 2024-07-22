import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loginscreen = ({navigation}) => {

    const navigate=()=>{
        navigation.navigate('bottom')
    }
  return (
    <View>
        <Pressable onPress={navigate}>
        <Text>Loginscreen</Text>
        </Pressable>
    
    </View>
  )
}

export default Loginscreen

const styles = StyleSheet.create({})