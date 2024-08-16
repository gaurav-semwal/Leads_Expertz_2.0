import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AddInventory from '../Screens/Inventory/AddInventory';
import Updatelead from '../Screens/UpdateLead';
import Updateuser from '../Screens/Staff Managment/UpdateUser';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Modal, StyleSheet } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { Colors } from '../Comman/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { End_Day, Start_Day, Update_Location } from '../../Api/authApi';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-toast-message';
import Taskscreen from '../Screens/TaskScreen';
import AddExpenseForm from '../Screens/Expense/AddExpense';
import Expensescreen from '../Screens/Expense/Expensescreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigation = ({ navigation }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [lastToggleDate, setLastToggleDate] = useState(null);
  const [hasEndedDay, setHasEndedDay] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingToggle, setPendingToggle] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);

  useEffect(() => {
    const loadToggleState = async () => {
      try {
        const savedToggleState = await AsyncStorage.getItem('toggleState');
        const savedToggleDate = await AsyncStorage.getItem('toggleDate');
        const savedHasEndedDay = await AsyncStorage.getItem('hasEndedDay');

        if (savedToggleState !== null) {
          setIsToggled(JSON.parse(savedToggleState));
        }
        if (savedToggleDate !== null) {
          setLastToggleDate(new Date(savedToggleDate));
        }
        if (savedHasEndedDay !== null) {
          setHasEndedDay(JSON.parse(savedHasEndedDay));
        }
      } catch (error) {
        console.error('Error loading toggle state from AsyncStorage:', error);
      }
    };


    loadToggleState();
  }, []);

  const resetAttendance = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.removeItem('toggleState');
      await AsyncStorage.removeItem('toggleDate');
      await AsyncStorage.removeItem('hasEndedDay');

      // Reset state variables
      setIsToggled(false);
      setLastToggleDate(null);
      setHasEndedDay(false);

      Toast.show({
        type: 'info',
        text1: 'Attendance has been reset!',
      });
    } catch (error) {
      console.error('Error resetting attendance:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to reset attendance',
      });
    }
  };


  const handleToggle = async (newState) => {
    const today = new Date();
    const lastToggle = lastToggleDate ? new Date(lastToggleDate) : null;

    try {
      if (
        lastToggle &&
        today.getDate() === lastToggle.getDate() &&
        today.getMonth() === lastToggle.getMonth() &&
        today.getFullYear() === lastToggle.getFullYear()
      ) {
        if (hasEndedDay) {
          Toast.show({
            type: 'error',
            text1: 'You have already ended your day, now you cannot start again!',
          });
          return;
        }

        if (!newState) {
          setIsToggled(newState);
          setHasEndedDay(true);

          await AsyncStorage.setItem('toggleState', JSON.stringify(newState));
          await AsyncStorage.setItem('hasEndedDay', JSON.stringify(true));


        } else {
          Toast.show({
            type: 'error',
            text1: 'You can only start your day once!',
          });
        }
      } else {
        setIsToggled(newState);
        setLastToggleDate(today);
        setHasEndedDay(!newState);

        await AsyncStorage.setItem('toggleState', JSON.stringify(newState));
        await AsyncStorage.setItem('toggleDate', today.toISOString());
        await AsyncStorage.setItem('hasEndedDay', JSON.stringify(!newState));

        if (newState) {

          await startday();
          updateLocation();
        } else {
        }
      }
    } catch (error) {
      console.error('Error toggling day:', error);
    }
  };

  const confirmToggle = async () => {
    setModalVisible(false);
    if (pendingToggle) {
      await handleToggle(pendingToggle);
    } else {
      await endday(lastLocation);
      await handleToggle(pendingToggle);
    }
  };

  const startday = async () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        console.log(location);

        // Format location data as a string
        const locationString = `${location.latitude},${location.longitude}`;

        try {
          const response = await Start_Day(locationString);
          console.log('STARTING DAY CHECKING', response);

          if (response.msg === 'Day started successfully. Good Luck.') {
            Toast.show({
              text1: response.msg,
              type: 'success',
            });
          } else {
            Toast.show({
              text1: response.msg,
              type: 'error',
            });
          }
        } catch (error) {
          console.error('Error starting day:', error);
          Toast.show({
            text1: 'Failed to start the day',
            type: 'error',
          });
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        Toast.show({
          text1: 'Failed to get location',
          type: 'error',
        });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const updateLocation = async (location) => {
    try {
      const response = await Update_Location(lastLocation);
      if (response.msg === 'Update successfully.') {
        setLastLocation(location);
        Toast.show({
          text1: response.msg,
          type: 'success',
        });
      } else {
        Toast.show({
          text1: response.msg,
          type: 'error',
        });
      }
    } catch (error) {
      Toast.show({
        text1: response.msg,
        type: 'error',
      });
    }
  };

  const endday = async (location) => {
    try {
      const response = await End_Day(lastLocation);
      if (response.msg === 'Day ended successfully.') {
        setLastLocation(location);
        Toast.show({
          text1: response.msg,
          type: 'success',
        });
      } else {
        Toast.show({
          text1: response.msg,
          type: 'error',
        });
      }
    } catch (error) {
      Toast.show({
        text1: response.msg,
        type: 'error',
      });
    }
  };
  const onTogglePress = (newState) => {
    if (hasEndedDay && newState) {
      Toast.show({
        type: 'error',
        text1: 'You have already ended your day',
      });
    } else {
      setPendingToggle(newState);
      setModalVisible(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Settings':
                iconName = 'cogs';
                break;
              case 'All Leads':
                iconName = 'list';
                break;
              case 'User List':
                iconName = 'users';
                break;
              default:
                iconName = 'question';
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Homescreen}
          options={{
            headerShown: true,
            headerTitle: 'Dashboard',
            headerStyle: {
              backgroundColor: '#625bc5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => (
              <Ionicons
                name="menu"
                size={30}
                color="#fff"
                style={{ marginLeft: 10, top: 2 }}
                onPress={() => navigation.openDrawer()}
              />
            ),
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <ToggleSwitch
                  isOn={isToggled}
                  onColor="#fff"
                  offColor="#a3a2a0"
                  size="small"
                  onToggle={onTogglePress}
                  circleColor="#625bc5"
                  style={styles.toggleContainer}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
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
            headerLeft: () => (
              <Ionicons
                name="menu"
                size={30}
                color="#fff"
                style={{ marginLeft: 10, top: 2 }}
                onPress={() => navigation.openDrawer()}
              />
            ),
          }}
        />
        <Tab.Screen
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
            headerLeft: () => (
              <Ionicons
                name="menu"
                size={30}
                color="#fff"
                style={{ marginLeft: 10, top: 2 }}
                onPress={() => navigation.openDrawer()}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settingsscreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#625bc5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => (
              <Ionicons
                name="menu"
                size={30}
                color="#fff"
                style={{ marginLeft: 10, top: 2 }}
                onPress={() => navigation.openDrawer()}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {pendingToggle ? 'Do you want to start your day?' : 'Do you want to end your day?'}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={confirmToggle}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={() => <Drawercontent />}>
      <Drawer.Screen
        name="Dashboard"
        component={BottomTabNavigation}
        options={{
          headerShown: false,
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
          <Stack.Screen
            name="Login"
            component={Loginscreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AppDrawer"
            component={DrawerNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Update Lead"
            component={Updatelead}
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
            name="CompanyHierarchy"
            component={CompanyHierarchy}
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
            name="FutureLead"
            component={SmartLeadSegmentation}
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
            name="Setting"
            component={Settingsscreen}
            options={{
              title: 'Profile Screen',
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
            name="Category"
            component={Category}
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
            name="SubCategory"
            component={SubCategory}
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
            name="Inventory"
            component={Inventory}
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
            name="AddInventory"
            component={AddInventory}
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
            name="Update User"
            component={Updateuser}
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
          {/* <Stack.Screen
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
          /> */}
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
            name="Task"
            component={Taskscreen}
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
            name="Add Expense"
            component={AddExpenseForm}
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
            name="Expense"
            component={Expensescreen}
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
          {/* <Stack.Screen
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
          /> */}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    height: 60,
    backgroundColor: Colors.Button,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 20,
  },
  image: {
    height: 40,
    width: 150,
    alignItems: 'center',
  },
  imageicon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 10,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleSwitch: {
    borderWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flex: 1,
    margin: 5,
  },
  buttonCancel: {
    backgroundColor: '#f44336',
  },
  buttonConfirm: {
    backgroundColor: '#4CAF50',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
