import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerContent = (props) => {
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [leadActiveSubMenu, setLeadActiveSubMenu] = useState(null);
    const [otherActiveSubMenu, setOtherActiveSubMenu] = useState(null);
    const [inventoryActiveSubMenu, setinventoryActiveSubMenu] = useState(null);
    const [eventsactiveSubMenu, seteventsActiveSubMenu] = useState(null);
    const [profilesactiveSubMenu, setprofileActiveSubMenu] = useState(null);


    const toggleSubMenu = (index) => {
        setActiveSubMenu(activeSubMenu === index ? null : index);
    };

    const toggleLeadSubMenu = (index) => {
        setLeadActiveSubMenu(leadActiveSubMenu === index ? null : index);
    };

    const toggleOtherSubMenu = (index) => {
        setOtherActiveSubMenu(otherActiveSubMenu === index ? null : index);
    };

    const toggleinventorySubMenu = (index) => {
        setinventoryActiveSubMenu(inventoryActiveSubMenu === index ? null : index);
    };

    const toggleeventsSubMenu = (index) => {
        seteventsActiveSubMenu(eventsactiveSubMenu === index ? null : index);
    };

    const toggleseetingsSubMenu = (index) => {
        setprofileActiveSubMenu(profilesactiveSubMenu === index ? null : index);
    };

    const renderSubMenu = (index) => {
        if (activeSubMenu === index) {
            return (
                <View style={styles.subMenu}>
                    <TouchableOpacity style={styles.subMenuItem} onPress={() => props.navigation.navigate('Add User')} >
                        <Ionicons name="person" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Add users</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}  onPress={() => props.navigation.navigate('User List')}>

                        <Ionicons name="person" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Users List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="person" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Promote List</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

    const renderLeadSubMenu = (index) => {
        if (leadActiveSubMenu === index) {
            return (
                <View style={styles.subMenu}>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="folder-outline" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Add Lead</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="folder-outline" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Allocate Lead</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="folder-outline" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>New Leads</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="folder-outline" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Sales Manager Leads</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="folder-outline" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Pending Leads</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="folder-outline" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Processing Leads</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="folder-outline" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Interested Leads</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="folder-outline" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Call Schedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="folder-outline" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Visit Schedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="folder-outline" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Visit Done</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="folder-outline" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Booked</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="folder-outline" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Completed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="folder-outline" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Cancelled</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.drawerItem} onPress={() => toggleOtherSubMenu(4)}>
                        <View style={styles.drawerItem1} >
                            <Entypo name="shop" size={20} color="#333" style={styles.icon} />
                            <Text style={styles.label}>Other</Text>
                        </View>
                        <Entypo name={otherActiveSubMenu === 4 ? "chevron-down" : "chevron-left"} size={20} color="#333" />
                    </TouchableOpacity>
                    {renderOtherSubMenu(4)}

                    <TouchableOpacity style={styles.drawerItemsingle} onPress={() => props.navigation.navigate('Dashboard')}>
                        <Entypo name="folder" size={20} color="#333" style={styles.icon} />
                        <Text style={styles.label}>All Leads</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.drawerItemsingle} onPress={() => props.navigation.navigate('Dashboard')}>
                        <Fontisto name="search" size={20} color="#333" style={styles.icon} />
                        <Text style={styles.label}>Search Leads</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

    const renderOtherSubMenu = (index) => {
        if (otherActiveSubMenu === index) {
            return (
                <View style={styles.subMenu}>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="person" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Not Reachable</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="person" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Wwrong Number</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="person" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Channel Partner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="person" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Not Interested</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="person" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Not Picked</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="person" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Lost</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };


    const rendereventsSubMenu = (index) => {
        if (eventsactiveSubMenu === index) {
            return (
                <View style={styles.subMenu}>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <FontAwesome name="birthday-cake" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Birthday</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <FontAwesome name="birthday-cake" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Anniversary</Text>
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
                    <TouchableOpacity style={styles.subMenuItem}>
                        <MaterialCommunityIcons name="file" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Category</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <MaterialCommunityIcons name="file" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Sub-Category</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <MaterialCommunityIcons name="file" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Inventory</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

    const renderprofileSubMenu = (index) => {
        if (profilesactiveSubMenu === index) {
            return (
                <View style={styles.subMenu}>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <Ionicons name="person" size={20} color="#666" style={styles.icon} />
                        <Text style={styles.subMenuText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuItem}>
                        <MaterialCommunityIcons name="logout" size={20} color="#666" style={styles.icon} />
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
                    resizeMode='contain'
                    source={require('../Assets/logo.png')}
                />
            </View>

            <TouchableOpacity style={styles.drawerItemsingle} onPress={() => props.navigation.navigate('Dashboard')}>
                <Entypo name="home" size={20} color="#333" style={styles.icon} />
                <Text style={styles.label}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItem} onPress={() => toggleSubMenu(2)}>
                <View style={styles.drawerItem1} >
                    <Ionicons name="people" size={20} color="#333" style={styles.icon} />
                    <Text style={styles.label}>Staff Management</Text>
                </View>
                <Entypo name={activeSubMenu === 2 ? "chevron-down" : "chevron-left"} size={20} color="#333" />
            </TouchableOpacity>
            {renderSubMenu(2)}

            <TouchableOpacity style={styles.drawerItem} onPress={() => toggleLeadSubMenu(3)}>
                <View style={styles.drawerItem1} >
                    <MaterialCommunityIcons name="account-clock" size={20} color="#333" style={styles.icon} />
                    <Text style={styles.label}>Leads Management</Text>
                </View>
                <Entypo name={leadActiveSubMenu === 3 ? "chevron-down" : "chevron-left"} size={20} color="#333" />
            </TouchableOpacity>
            {renderLeadSubMenu(3)}

            <TouchableOpacity style={styles.drawerItemsingle} onPress={() => props.navigation.navigate('Dashboard')}>
                <Ionicons name="folder-outline" size={20} color="#333" style={styles.icon} />
                <Text style={styles.label}>Future Lead</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.drawerItem} onPress={() => toggleinventorySubMenu(5)}>
                <View style={styles.drawerItem1} >
                    <MaterialCommunityIcons name="clipboard-file" size={20} color="#333" style={styles.icon} />
                    <Text style={styles.label}>Inventory</Text>
                </View>
                <Entypo name={leadActiveSubMenu === 3 ? "chevron-down" : "chevron-left"} size={20} color="#333" />
            </TouchableOpacity>
            {renderinventorySubMenu(5)}


            <TouchableOpacity style={styles.drawerItemsingle} onPress={() => props.navigation.navigate('Dashboard')}>
                <Fontisto name="arrow-swap" size={20} color="#333" style={styles.icon} />
                <Text style={styles.label}>Leads Transfer</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.drawerItem} onPress={() => toggleeventsSubMenu(6)}>
                <View style={styles.drawerItem1} >
                    <Fontisto name="calendar" size={20} color="#333" style={styles.icon} />
                    <Text style={styles.label}>Events</Text>
                </View>
                <Entypo name={eventsactiveSubMenu === 3 ? "chevron-down" : "chevron-left"} size={20} color="#333" />
            </TouchableOpacity>
            {rendereventsSubMenu(6)}

            <TouchableOpacity style={styles.drawerItemsingle} onPress={() => props.navigation.navigate('Dashboard')}>
                <Fontisto name="calendar" size={20} color="#333" style={styles.icon} />
                <Text style={styles.label}>Company Hierarchy</Text>
            </TouchableOpacity>


            {/* <TouchableOpacity style={styles.drawerItem} onPress={() => toggleeventsSubMenu(6)}>
                <View style={styles.drawerItem1} >
                    <Entypo name="shop" size={20} color="#333" style={styles.icon} />
                    <Text style={styles.label}>Reports</Text>
                </View>
                <Entypo name={eventsactiveSubMenu === 3 ? "chevron-down" : "chevron-left"} size={20} color="#333" />
            </TouchableOpacity>
            {rendereventsSubMenu(7)} */}


            <TouchableOpacity style={styles.drawerItem} onPress={() => toggleseetingsSubMenu(8)}>
                <View style={styles.drawerItem1} >
                    <MaterialCommunityIcons name="account-cog" size={25} color="#333" style={styles.icon} />
                    <Text style={styles.label}>Setting</Text>
                </View>
                <Entypo name={profilesactiveSubMenu === 3 ? "chevron-down" : "chevron-left"} size={20} color="#333" />
            </TouchableOpacity>
            {renderprofileSubMenu(8)}

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
        padding: 10
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
});

export default DrawerContent;
