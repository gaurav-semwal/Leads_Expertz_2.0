import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loginscreen from '../Authentication/Loginscreen';
import { Provider } from 'react-native-paper';
import Bottomnavigation from './Bottomnavigation';

const Stack = createNativeStackNavigator();

const Stacknavigation = () => {
  return (
    <NavigationContainer>
      <Provider>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Loginscreen} options={{ headerShown: false }} />
      <Stack.Screen name="bottom" component={Bottomnavigation} options={{ headerShown: false }} />
    </Stack.Navigator>
      </Provider>
  </NavigationContainer>
  )
}

export default Stacknavigation

const styles = StyleSheet.create({})