import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import Loginscreen from '../Authentication/Loginscreen';
import Homescreen from '../Screens/Homescreen';
import Drawercontent from './Drawercontent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={props => <Drawercontent {...props} />}>
      <Drawer.Screen name="Dashboard" component={Homescreen} options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#625bc5',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
    </Drawer.Navigator>
  );
};

const Stacknavigation = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Loginscreen} options={{ headerShown: false }} />
          <Stack.Screen name="AppDrawer" component={DrawerNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default Stacknavigation;
