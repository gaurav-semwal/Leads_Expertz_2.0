import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  Alert,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../Components/Button';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Add_Expense } from '../../../Api/authApi';

export default function AddExpenseForm() {
  const navigation = useNavigation();
  const [billed, setBilled] = useState('');
  const [category, setCategory] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [reference, setReference] = useState('');

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const handleCategoryChange = (itemValue) => {
    setSelectedCategory(itemValue);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const submitExpense = async () => {
    console.log('CHECKING ADDING EXPENSE OR NOT', billed,
      selectedCategory,
      amount,
      reference,
      formatDate(date),
      selectedImage);
    try {
      const response = await Add_Expense(
        billed,
        selectedCategory,
        amount,
        reference,
        formatDate(date),
        selectedImage
      );

      if (response.msg === 'Expense created successfully.') {
        Toast.show({ text1: response.msg, type: 'success' });
        navigation.navigate('Expense');
      } else {
        Toast.show({ text1: response.msg, type: 'error' });
      }
    } catch (error) {

      Toast.show({ text1: response.msg, type: 'error' });
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera.',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const openGallery = () => {
    const options = { mediaType: 'photo', includeBase64: false, maxHeight: 2000, maxWidth: 2000 };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('Image Picker Error:', response.errorCode);
      } else {
        const imageUri = response.assets[0].uri;
        setSelectedImage(imageUri);
        setModalVisible(false);
      }
    });
  };

  const openCamera = () => {
    const options = { mediaType: 'photo', includeBase64: false, maxHeight: 2000, maxWidth: 2000 };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.error('Camera Error:', response.errorCode);
      } else {
        const imageUri = response.assets[0].uri;
        setSelectedImage(imageUri);
        setModalVisible(false);
      }
    });
  };

  const chooseImage = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={chooseImage} style={styles.imagePickerButton}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePickerPlaceholder}>
              <FontAwesome name="photo" size={24} color="#aaa" />
              <Text style={styles.imagePickerText}>Add Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          label="Title"
          value={billed}
          onChangeText={setBilled}
          mode="outlined"
          style={styles.input}
        />

        <View style={styles.picker}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={handleCategoryChange}
            mode="dropdown"
          >
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="TA" value="TA" />
            <Picker.Item label="DA" value="DA" />
            <Picker.Item label="Hotels" value="Hotels" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>

        <TextInput
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          mode="outlined"
          style={styles.input}
          keyboardType="numeric"
        />

        <TextInput
          label="Enter Comment"
          value={reference}
          onChangeText={setReference}
          mode="outlined"
          style={styles.input}
        />

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View style={styles.datePicker}>
            <Fontisto name="date" size={20} color="#000" />
            <Text style={styles.dateText}>{formatDate(date)}</Text>
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Choose Image</Text>
              <Pressable style={styles.modalButton} onPress={openGallery}>
                <MaterialIcons name="photo-library" size={24} color="#000" />
                <Text style={styles.modalButtonText}>Gallery</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={openCamera}>
                <MaterialCommunityIcons name="camera" size={24} color="#000" />
                <Text style={styles.modalButtonText}>Camera</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.submitButton} onPress={submitExpense}>
          <Button text="Submit" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  input: {
    marginVertical: 8,
    backgroundColor: '#fff'
  },
  picker: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 8,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 8,

  },
  dateText: {
    fontSize: 16,
    marginLeft: 20,
    fontWeight: 'bold'

  },
  imagePickerButton: {
    marginVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  imagePickerPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePickerText: {
    marginLeft: 8,
    color: '#aaa',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#ddd',
    marginVertical: 8,
    width: '100%',
    justifyContent: 'center',
  },
  modalButtonText: {
    marginLeft: 8,
    fontSize: 16,
  },
  submitButton: {
    marginTop: '20%',
  },
});
