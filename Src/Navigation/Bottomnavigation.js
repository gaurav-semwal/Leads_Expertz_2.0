import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Homescreen from '../Screens/Homescreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Staffmanagment from '../Screens/Staffmanagment';
import Leadmanagment from '../Screens/Leadmanagment';
import Settingsscreen from '../Screens/Settingsscreen';
import Inventoryscreen from '../Screens/Inventoryscreen';

const Tab = createBottomTabNavigator();

const Bottomnavigation = () => {
  return (
    <Tab.Navigator
         screenOptions={{
        tabBarStyle: { backgroundColor: 'white' },
        tabBarActiveTintColor: '#625bc5',
        tabBarInactiveTintColor: '#8a8a87',
      }}>
      <Tab.Screen name="Home" component={Homescreen}  options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }} 
      /> 
      <Tab.Screen name="staff" component={Staffmanagment} 
      initialParams={{'screen': "Bottmbar"}}
      options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }} 
      />
        <Tab.Screen name="lead" component={Leadmanagment}  options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }} 
      />
        <Tab.Screen name="inventory" component={Inventoryscreen}  options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }} 
      />
         <Tab.Screen name="setting" component={Settingsscreen}  options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  )
}

export default Bottomnavigation

const styles = StyleSheet.create({})