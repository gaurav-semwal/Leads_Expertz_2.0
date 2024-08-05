import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  Linking
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Get_Role, Get_User } from '../../../Api/authApi';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';

const Userlist = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedTM, setSelectedTM] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = user => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    getrole();
  }, []);

  const getrole = async () => {
    const password = await AsyncStorage.getItem('password');
    const email = await AsyncStorage.getItem('email');
    try {
      const response = await Get_Role(email, password);
      if (response.data) {
        setRoles(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const fetchData = async () => {
    try {
      const response = await Get_User();
      console.log(response);
      if (response.msg === 'Load successfully.') {
        setUserData(response.data);
      } else {
        Toast.show({
          text1: response.msg,
          type: 'error',
        });
      }
    } catch (error) {
      Toast.show({
        text1: 'Error',
        type: 'error',
      });
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  };

  const handlePhonePress = (phoneNumber) => {
    let phoneUrl = `tel:${phoneNumber}`;

    Linking.openURL(phoneUrl)
      .then((supported) => {
        if (!supported) {
          console.log(`Phone dialing not supported for number: ${phoneNumber}`);
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch((err) => {
        console.error('An error occurred', err);
        if (Platform.OS === 'android' && err.message.includes('not supported')) {
          console.log('Android phone dialing may not be supported');
        } else if (Platform.OS === 'ios' && err.message.includes('not allowed')) {
          console.log('iOS phone dialing permission not allowed');
        }
      });
  };

  const onPressPlusButton = () => {
    navigation.navigate('Add User');
  };

  const editleadnavigate = () => {
    navigation.navigate('Update User');
  };

  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const Item = ({ item }) => {
    return (
      <Pressable>
        <View style={styles.leadContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View style={styles.profileContainer}>
                <View style={styles.profileLetterContainer}>
                  <Text style={styles.profileLetter}>{getFirstLetter(item.name)}</Text>
                </View>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.leadTitle}>{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.leadInfo}>{item.mobile}</Text>
                  <TouchableOpacity
                    onPress={() => handlePhonePress(item.mobile)}>
                    <View style={{ marginLeft: 10 }}>
                      <AntDesign name="phone" size={20} color="darkgreen" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => editleadnavigate()}
                style={{ right: '50%' }}>
                <AntDesign name="edit" size={25} color="orange" />
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => openModal(item)}>
                <FontAwesome name="edit" size={25} color="green" />
              </TouchableOpacity> */}
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.leadInfo1}>Lead ID: {item.id}</Text>
            <Text style={styles.leadInfo1}>Role: {item.role}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.leadInfo1}>
                Created Date: {item.created_date}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={userData}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      <View style={styles.plusButtonContainer}>
        <Pressable style={styles.plusButton} onPress={onPressPlusButton}>
          <AntDesign name="plus" size={28} color="#dbdad3" />
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text>Promote User</Text>
            <View style={styles.dropdowncontainer1}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={itemValue => setSelectedValue(itemValue)}>
                <Picker.Item label="Select Role" value="" />
                {roles.map(role => (
                  <Picker.Item
                    key={role.id}
                    label={role.role_name}
                    value={role.role_name}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.dropdowncontainer1}>
              <Picker
                selectedValue={selectedTM}
                onValueChange={itemValue => setSelectedTM(itemValue)}>
                <Picker.Item label="Select Team Manager" value="" />
                {['Admin', 'GM', 'SM1', 'Vaibhav', 'Tester'].map(
                  (tm, index) => (
                    <Picker.Item key={index} label={tm} value={tm} />
                  ),
                )}
              </Picker>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button title="Close" onPress={closeModal} />
              <Button
                title="Save changes"
                onPress={() => {
                  closeModal();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  leadContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#625bc5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileLetterContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileLetter: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  leadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  leadInfo: {
    fontSize: 14,
    color: '#555',
  },
  leadInfo1: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  plusButtonContainer: {
    position: 'absolute',
    backgroundColor: '#625bc5',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    alignSelf: 'flex-end',
    bottom: 20,
    right: 20,
  },
  plusButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  dropdowncontainer1: {
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#625bc5',
    marginTop: 20,
  },
});

export default Userlist;
