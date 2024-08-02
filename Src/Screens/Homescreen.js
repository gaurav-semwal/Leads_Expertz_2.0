import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Leadshomegrid from '../Components/Leadshomegrid';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Add_Quick_Lead } from '../../Api/authApi';
import Toast from 'react-native-toast-message';

const Homescreen = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [leads, setLeads] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onPressPlusButton = () => {
    navigation.navigate('Add Lead');
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addquicklead = async () => {
    try {
      const response = await Add_Quick_Lead(name, number);
      console.log('add', response)
      if (response.statusCode === 200 && response.result && response.result.msg === 'Save successfully') {
        console.log('enter')
        setModalVisible(false);
        setName('');
        setNumber('');
        Toast.show({
          text1: response.msg,
          type: 'success',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Pressable style={styles.buttoncontainer1} onPress={openModal}>
          <Text style={styles.text}>Add Quick Lead</Text>
        </Pressable>
      </View>
      <View style={styles.dropdowncontainer1}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Self" value="Self" />
          <Picker.Item label="Team" value="Team" />
        </Picker>
      </View>
      <Leadshomegrid />

      <View style={styles.plusButtonContainer}>
        <Pressable style={styles.plusButton} onPress={onPressPlusButton}>
          <AntDesign name="plus" size={28} color="#dbdad3" />
        </Pressable>
      </View>

      {/* Modal for Add Quick Lead */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Quick Lead</Text>
              <Pressable onPress={closeModal}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={25}
                  color="#625bc5"
                />
              </Pressable>
            </View>
            <TextInput
              placeholder="Enter Your Name"
              value={name}
              onChangeText={text => setName(text)}
              style={styles.textinput}
              mode="outlined"
            />
            <TextInput
              placeholder="Enter Your Number"
              value={number}
              onChangeText={text => setNumber(text)}
              style={styles.textinput}
              mode="outlined"
              keyboardType='numeric'
              maxLength={10}
            />
            <Pressable style={styles.submitButton} onPress={addquicklead}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
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
  dropdowncontainer1: {
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#625bc5',
    marginTop: 6,
    margin: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    alignItems: 'center',
  },
  buttoncontainer1: {
    height: 38,
    width: '35%',
    borderRadius: 10,
    backgroundColor: '#625bc5',
    alignItems: 'center',
    marginLeft: 10,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textinput: {
    width: '100%',
    marginBottom: 15, // Added margin for spacing
    marginTop: 10
  },
  submitButton: {
    backgroundColor: '#625bc5', // Custom background color for the button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#fff', // Text color for the button
    fontSize: 16,
  },
});

export default Homescreen;
