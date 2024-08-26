import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DrawerContent = props => {
  const navigation = useNavigation();

  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [leadActiveSubMenu, setLeadActiveSubMenu] = useState(null);
  const [otherActiveSubMenu, setOtherActiveSubMenu] = useState(null);
  const [inventoryActiveSubMenu, setinventoryActiveSubMenu] = useState(null);
  const [eventsactiveSubMenu, seteventsActiveSubMenu] = useState(null);
  const [profilesactiveSubMenu, setprofileActiveSubMenu] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const getRole = async () => {
      const storedRole = await AsyncStorage.getItem('role');
      setRole(storedRole);
    };
    getRole();
  }, []);

  const handleLogout = () => {
    setIsModalVisible(true);
  };
  const confirmLogout = () => {
    setIsModalVisible(false);
    navigation.navigate('Login');
  };
  const cancelLogout = () => {
    setIsModalVisible(false);
  };

  const toggleSubMenu = index => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const toggleLeadSubMenu = index => {
    setLeadActiveSubMenu(leadActiveSubMenu === index ? null : index);
  };

  const toggleOtherSubMenu = index => {
    setOtherActiveSubMenu(otherActiveSubMenu === index ? null : index);
  };

  const toggleinventorySubMenu = index => {
    setinventoryActiveSubMenu(inventoryActiveSubMenu === index ? null : index);
  };

  const toggleeventsSubMenu = index => {
    seteventsActiveSubMenu(eventsactiveSubMenu === index ? null : index);
  };

  const toggleseetingsSubMenu = index => {
    setprofileActiveSubMenu(profilesactiveSubMenu === index ? null : index);
  };

  const renderSubMenu = index => {
    if (activeSubMenu === index) {
      return (
        <View style={styles.subMenu}>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Add User')}>
            <Ionicons
              name="person"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Add users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('User List')}>
            <Ionicons
              name="person"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Users List</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderLeadSubMenu = index => {
    if (leadActiveSubMenu === index) {
      return (
        <View style={styles.subMenu}>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Add Lead')}>
            <Ionicons
              name="folder-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Add Lead</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Allocate Leads')}>
            <Ionicons
              name="folder-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Allocate Lead</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('New Leads')}>
            <Ionicons
              name="folder-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>New Leads</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Sales Manage')}>
            <Ionicons
              name="folder-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Sales Manager Leads</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Pending Lead')}>
            <Ionicons
              name="folder-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Pending Leads</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Processing Lead')}>
            <Ionicons
              name="folder-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Processing Leads</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Interested Lead')}>
            <Ionicons
              name="folder-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Interested Leads</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Call Scheduled')}>
            <Ionicons
              name="folder-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Call Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Visit Scheduled')}>
            <Ionicons
              name="folder-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Visit Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Visit Done')}>
            <Ionicons
              name="folder-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Visit Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Booked')}>
            <Ionicons
              name="folder-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Booked</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Completed')}>
            <Ionicons
              name="folder-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Cancelled')}>
            <Ionicons
              name="folder-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Cancelled</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => toggleOtherSubMenu(4)}>
            <View style={styles.drawerItem1}>
              <Entypo name="shop" size={20} color="#333" style={styles.icon} />
              <Text style={styles.label}>Other</Text>
            </View>
            <Entypo
              name={otherActiveSubMenu === 4 ? 'chevron-down' : 'chevron-left'}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
          {renderOtherSubMenu(4)}

          <TouchableOpacity
            style={styles.drawerItemsingle}
            onPress={() => navigation.navigate('All Leads')}>
            <Entypo name="folder" size={20} color="#333" style={styles.icon} />
            <Text style={styles.label}>All Leads</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.drawerItemsingle}
            onPress={() => navigation.navigate('Search Leads')}>
            <Fontisto
              name="search"
              size={20}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.label}>Search Leads</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderOtherSubMenu = index => {
    if (otherActiveSubMenu === index) {
      return (
        <View style={styles.subMenu}>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Not Reachable')}>
            <Ionicons
              name="person"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Not Reachable</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Wrong Number')}>
            <Ionicons
              name="person"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Wrong Number</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Channel Partners')}>
            <Ionicons
              name="person"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Channel Partner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Not Interested')}>
            <Ionicons
              name="person"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Not Interested</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Not Picked')}>
            <Ionicons
              name="person"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Not Picked</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Lost')}>
            <Ionicons
              name="person"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Lost</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };
  const renderinventorySubMenu = (index) => {
    if (inventoryActiveSubMenu === index) {
      return (
        <View style={styles.subMenu}>
          {['salesman','telecaller'].includes(role) && (
            <TouchableOpacity
              style={styles.subMenuItem}
              onPress={() => navigation.navigate('Inventory')}
            >
              <MaterialCommunityIcons
                name="file"
                size={20}
                color="#666"
                style={styles.icon}
              />
              <Text style={styles.subMenuText}>Inventory</Text>
            </TouchableOpacity>
          )}
          {['team_manager'].includes(role) && (
            <>
              <TouchableOpacity
                style={styles.subMenuItem}
                onPress={() => navigation.navigate('Category')}
              >
                <MaterialCommunityIcons
                  name="file"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
                <Text style={styles.subMenuText}>Category</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subMenuItem}
                onPress={() => navigation.navigate('SubCategory')}
              >
                <MaterialCommunityIcons
                  name="file"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
                <Text style={styles.subMenuText}>Sub-Category</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subMenuItem}
                onPress={() => navigation.navigate('Inventory')}
              >
                <MaterialCommunityIcons
                  name="file"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
                <Text style={styles.subMenuText}>Inventory</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      );
    }
    return null;
  };
  

  const renderprofileSubMenu = index => {
    if (profilesactiveSubMenu === index) {
      return (
        <View style={styles.subMenu}>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Setting')}>
            <Ionicons
              name="person"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subMenuItem} onPress={handleLogout}>
            <MaterialCommunityIcons
              name="logout"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.subMenuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../Assets/logo.png')}
        />
      </View>

      {['staff','postsale'].includes(role) && (
        <TouchableOpacity
          style={styles.drawerItemsingle}
          onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={20} color="#333" style={styles.icon} />
          <Text style={styles.label}>Dashboard</Text>
        </TouchableOpacity>
      )}

      {['team_manager', 'salesman','telecaller'].includes(role) && (
        <>
          <TouchableOpacity
            style={styles.drawerItemsingle}
            onPress={() => navigation.navigate('Home')}>
            <Entypo name="home" size={20} color="#333" style={styles.icon} />
            <Text style={styles.label}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => toggleLeadSubMenu(3)}>
            <View style={styles.drawerItem1}>
              <MaterialCommunityIcons
                name="account-clock"
                size={20}
                color="#333"
                style={styles.icon}
              />
              <Text style={styles.label}>Leads Management</Text>
            </View>
            <Entypo
              name={leadActiveSubMenu === 3 ? 'chevron-down' : 'chevron-left'}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
          {renderLeadSubMenu(3)}

          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => toggleinventorySubMenu(5)}>
            <View style={styles.drawerItem1}>
              <MaterialCommunityIcons
                name="clipboard-file"
                size={20}
                color="#333"
                style={styles.icon}
              />
              <Text style={styles.label}>Inventory</Text>
            </View>
            <Entypo
              name={inventoryActiveSubMenu === 5 ? 'chevron-down' : 'chevron-left'}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
          {renderinventorySubMenu(5)}

        </>
      )}

      {role === 'team_manager' && (
        <>


          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => toggleSubMenu(2)}>
            <View style={styles.drawerItem1}>
              <Ionicons name="people" size={20} color="#333" style={styles.icon} />
              <Text style={styles.label}>Staff Management</Text>
            </View>
            <Entypo
              name={activeSubMenu === 2 ? 'chevron-down' : 'chevron-left'}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
          {renderSubMenu(2)}



          <TouchableOpacity
            style={styles.drawerItemsingle}
            onPress={() => navigation.navigate('FutureLead')}>
            <Ionicons
              name="folder-outline"
              size={20}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.label}>Future Lead</Text>
          </TouchableOpacity>



          <TouchableOpacity
            style={styles.drawerItemsingle}
            onPress={() => navigation.navigate('Lead Transfer')}>
            <Fontisto
              name="arrow-swap"
              size={20}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.label}>Leads Transfer</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.drawerItem}
        // onPress={() => toggleeventsSubMenu(6)}
        onPress={() => navigation.navigate('Task')}
        >
        <View style={styles.drawerItem1}>
          <FontAwesome5
            name="tasks"
            size={20}
            color="#333"
            style={styles.icon}
          />
          <Text style={styles.label}>Task Managment</Text>
        </View>
        {/* <Entypo
          name={eventsactiveSubMenu === 6 ? 'chevron-down' : 'chevron-left'}
          size={20}
          color="#333"
        /> */}
      </TouchableOpacity>
      {/* {rendereventsSubMenu(6)} */}

      <TouchableOpacity
        style={styles.drawerItemsingle}
        onPress={() => navigation.navigate('Expense')}>
        <Ionicons
          name="menu"
          size={20}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.label}>Expense Managment</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.drawerItemsingle}
        onPress={() => navigation.navigate('Post Sale')}>
        <MaterialCommunityIcons
          name="post"
          size={20}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.label}>Post Sale</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity style={styles.drawerItem} onPress={() => toggleeventsSubMenu(6)}>
                <View style={styles.drawerItem1} >
                    <Entypo name="shop" size={20} color="#333" style={styles.icon} />
                    <Text style={styles.label}>Reports</Text>
                </View>
                <Entypo name={eventsactiveSubMenu === 3 ? "chevron-down" : "chevron-left"} size={20} color="#333" />
            </TouchableOpacity>
            {rendereventsSubMenu(7)} */}


      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => toggleseetingsSubMenu(8)}>
        <View style={styles.drawerItem1}>
          <MaterialCommunityIcons
            name="account-cog"
            size={20}
            color="#333"
            style={styles.icon}
          />
          <Text style={styles.label}>Setting</Text>
        </View>
        <Entypo
          name={profilesactiveSubMenu === 8 ? 'chevron-down' : 'chevron-left'}
          size={20}
          color="#333"
        />
      </TouchableOpacity>
      {renderprofileSubMenu(8)}

      <View>
        {/* Your other component code */}
        {renderprofileSubMenu(0)}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Do you want to logout?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={confirmLogout}
                  style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={cancelLogout}
                  style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </DrawerContentScrollView>

  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: '50%',
    width: '80%',
    alignSelf: 'center',
  },
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  drawerItemsingle: {
    flexDirection: 'row',
    padding: 10,
  },
  drawerItem1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
  },
  subMenu: {
    marginTop: 10,
  },
  subMenuItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  subMenuText: {
    fontSize: 14,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#385dab',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DrawerContent;
