import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Get_user } from '../../../Api/authApi';

const Expensescreen = ({ navigation }) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState('');
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userData, setUserData] = useState([]);
  const [expenses, setExpenses] = useState([]); // Example expense data
  const [filteredExpenses, setFilteredExpenses] = useState([]); // Filtered data to display

  useEffect(() => {
    getUser();
  }, []);

  const handleFromDateChange = (event, date) => {
    setShowFromDatePicker(false);
    if (date) {
      setFromDate(date);
    }
  };

  const handleToDateChange = (event, date) => {
    setShowToDatePicker(false);
    if (date) {
      setToDate(date);
    }
  };

  const getUser = async () => {
    try {
      const response = await Get_user();
      console.log('user', response);
      if (response.msg === 'Load successfully.') {
        setUserData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = () => {
    // Dummy expense data for filtering
    const dummyExpenses = [
      { id: 1, date: '2023-08-01', user: 'John', category: 'TA', amount: 100 },
      { id: 2, date: '2023-08-05', user: 'Jane', category: 'DA', amount: 200 },
      { id: 3, date: '2023-08-10', user: 'John', category: 'Hotels', amount: 300 },
      // Add more dummy data here...
    ];

    // Convert dates to ISO string for comparison
    const fromDateISO = fromDate.toISOString().split('T')[0];
    const toDateISO = toDate.toISOString().split('T')[0];

    // Filter expenses based on selected criteria
    const filtered = dummyExpenses.filter(expense => {
      const expenseDate = expense.date;
      return (
        expenseDate >= fromDateISO &&
        expenseDate <= toDateISO &&
        (selectedUser ? expense.user === selectedUser : true) &&
        (selectedCategory ? expense.category === selectedCategory : true)
      );
    });

    setFilteredExpenses(filtered);
  };

  const renderExpenseItem = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text>{item.user} - {item.category} - {item.date} - ${item.amount}</Text>
    </View>
  );

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
            <Picker
              selectedValue={selectedUser}
              onValueChange={itemValue => setSelectedUser(itemValue)}
              style={styles.picker}
            >
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
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={setSelectedCategory}
              style={styles.picker}
            >
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="TA" value="TA" />
              <Picker.Item label="DA" value="DA" />
              <Picker.Item label="Hotels" value="Hotels" />
              <Picker.Item label="Others" value="Others" />
            </Picker>
          </View>
        </View>

        <Pressable style={styles.searchButton} onPress={onSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredExpenses}
        keyExtractor={item => item.id.toString()}
        renderItem={renderExpenseItem}
        ListEmptyComponent={<Text>No expenses found for the selected criteria.</Text>}
      />

      <Pressable style={styles.plusButton} onPress={() => navigation.navigate('Add Expense')}>
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
    borderWidth:1
  },
  picker: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
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
  dateText: {
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#625bc5',
    width: 90,
    borderRadius: 7,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  searchButtonText: {
    color: 'white',
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
  expenseItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default Expensescreen;
