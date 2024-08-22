import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Button } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker'; // Install this package if not already
import { Picker } from '@react-native-picker/picker';
import { Get_user } from '../../../Api/authApi';

const Expensescreen = ({ navigation }) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState("");
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userData, setuserData] = useState([]);
  const [user, setuser] = useState('');

  const handleFromDateChange = (event, date) => {
    setShowFromDatePicker(false);
    if (date !== undefined) {
      setFromDate(date);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  const handleCategoryChange = (itemValue) => {
    setSelectedCategory(itemValue);
  };

  const handleToDateChange = (event, date) => {
    setShowToDatePicker(false);
    if (date !== undefined) {
      setToDate(date);
    }
  };

  const onPressPlusButton = () => {
    navigation.navigate('Add Expense');
  };

  const onSearch = () => {
    // Implement your search logic here
  };

  const getuser = async () => {
    try {
      const response = await Get_user();
      console.log('user', response)
      if (response.msg === 'Load successfully.') {
        setuserData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.row}>
          <View style={styles.datePickerContainer}>
            <Text style={styles.label}>From Date</Text>
            <Pressable style={styles.datePicker} onPress={() => setShowFromDatePicker(true)}>
              <Text style={styles.dateText}>{fromDate.toDateString()}</Text>
            </Pressable>
          </View>
          <View style={styles.datePickerContainer}>
            <Text style={styles.label}>To Date</Text>
            <Pressable style={styles.datePicker} onPress={() => setShowToDatePicker(true)}>
              <Text style={styles.dateText}>{toDate.toDateString()}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputContainer}>
          <View style={styles.picker}> 
          <Picker
                selectedValue={user}
                onValueChange={itemValue => setuser(itemValue)}>
                <Picker.Item label="Select User" value="" />
                {userData.map(userItem => (
                  <Picker.Item
                    key={userItem.id}
                    label={`${userItem.name} (${userItem.role.replace('_', ' ')})`}
                    value={userItem.name}
                  />
                ))}
              </Picker>
              </View>
          </View>
          <View style={styles.inputContainer}>
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
        
          </View>
        </View>

        <Pressable style={styles.searchButton} onPress={onSearch}>
        <Text style={{color:'white'}}>Search</Text>
        </Pressable>
      </View>

      <Pressable style={styles.plusButton} onPress={onPressPlusButton}>
        <AntDesign name="plus" size={28} color="#dbdad3" />
      </Pressable>

      {showFromDatePicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={handleFromDateChange}
        />
      )}

      {showToDatePicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={handleToDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  formContainer: {
    marginBottom: 80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  datePickerContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  picker:{
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  datePicker: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  picker: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 8,
  },
  dateText: {
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#625bc5',
    width: 90,
    borderRadius:7,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center'
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#625bc5',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
});

export default Expensescreen;
