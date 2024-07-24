import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import Loginscreen from '../Authentication/Loginscreen';
import Homescreen from '../Screens/Homescreen';
import Drawercontent from './Drawercontent';
import Adduser from '../Screens/Staff Managment/Adduser';
import Userlist from '../Screens/Staff Managment/Userlist';
import SmartLeadSegmentation from '../Screens/SmartLeadSegmentation;';
import CompanyHierarchy from '../Screens/CompanyHierarchy;';
import Settingsscreen from '../Screens/Settingsscreen';

import Addlead from '../Screens/Lead Managment/Addlead';
import Allocatelead from '../Screens/Lead Managment/Allocatelead';
import Newleads from '../Screens/Lead Managment/Newleads';
import Salesmanagerlead from '../Screens/Lead Managment/Salesmanagerlead';
import Pendinglead from '../Screens/Lead Managment/Pendinglead';
import Processinglead from '../Screens/Lead Managment/Processinglead';
import Interestedlead from '../Screens/Lead Managment/Interestedlead';
import Callschedule from '../Screens/Lead Managment/Callschedule';
import Visitschedule from '../Screens/Lead Managment/Visitschedule';
import Visitdone from '../Screens/Lead Managment/Visitdone';
import Booked from '../Screens/Lead Managment/Booked';
import Completed from '../Screens/Lead Managment/Completed';
import Cancelled from '../Screens/Lead Managment/Cancelled';
import Category from '../Screens/Inventory/Category';
import SubCategory from '../Screens/Inventory/SubCategory';
import Inventory from '../Screens/Inventory/Inventory';
import Promtescreen from '../Screens/Staff Managment/Promtescreen';
import Notreachable from '../Screens/Lead Managment/Others/Notreachable';
import Wrongnumber from '../Screens/Lead Managment/Others/Wrongnumber';
import Channelpartners from '../Screens/Lead Managment/Others/Channelpartners';
import Notinterested from '../Screens/Lead Managment/Others/Notinterested';
import Notpicked from '../Screens/Lead Managment/Others/Notpicked';
import Lost from '../Screens/Lead Managment/Others/Lost';
import Leadtransfer from '../Screens/Leadtransfer';
import Allleads from '../Screens/Lead Managment/Allleads';
import Searchleads from '../Screens/Lead Managment/Searchleads';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={props => <Drawercontent {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={Homescreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#625bc5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
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
          <Stack.Screen name="CompanyHierarchy" component={CompanyHierarchy}   options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}/>
          <Stack.Screen name="FutureLead" component={SmartLeadSegmentation}  options={{
              headerShown: true,

              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
  
              },
            }}/>
          <Stack.Screen name="Setting" component={Settingsscreen} options={{ title: 'Profile Screen', headerShown: true }} />
          <Stack.Screen name="Category" component={Category}   options={{
              headerShown: true,

              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
  
              },
            }}
          />
            <Stack.Screen name="SubCategory" component={SubCategory}   options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
              <Stack.Screen name="Inventory" component={Inventory}   options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />

          <Stack.Screen
            name="Add User"
            component={Adduser}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="User List"
            component={Userlist}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
              <Stack.Screen
            name="PromoteList"
            component={Promtescreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
           <Stack.Screen
            name="Add Lead"
            component={Addlead}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
           <Stack.Screen
            name="Allocate Leads"
            component={Allocatelead}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
               <Stack.Screen
            name="New Leads"
            component={Newleads}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
            <Stack.Screen
            name="Sales Manage"
            component={Salesmanagerlead}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Pending Lead"
            component={Pendinglead}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
            <Stack.Screen
            name="Processing Lead"
            component={Processinglead}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
           <Stack.Screen
            name="Interested Lead"
            component={Interestedlead}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
           <Stack.Screen
            name="Call Scheduled"
            component={Callschedule}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
           <Stack.Screen
            name="Visit Scheduled"
            component={Visitschedule}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Visit Done"
            component={Visitdone}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Booked"
            component={Booked}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
           <Stack.Screen
            name="Completed"
            component={Completed}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
           <Stack.Screen
            name="Cancelled"
            component={Cancelled}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
             <Stack.Screen
            name="Not Reachable"
            component={Notreachable}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
            <Stack.Screen
            name="Wrong Number"
            component={Wrongnumber}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
            <Stack.Screen
            name="Channel Partners"
            component={Channelpartners}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
            <Stack.Screen
            name="Not Interested"
            component={Notinterested}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
            <Stack.Screen
            name="Not Picked"
            component={Notpicked}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
            <Stack.Screen
            name="Lost"
            component={Lost}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
               <Stack.Screen
            name="Lead Transfer"
            component={Leadtransfer}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
            <Stack.Screen
            name="All Leads"
            component={Allleads}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Search Leads"
            component={Searchleads}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#625bc5',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default Stacknavigation;
