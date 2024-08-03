import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, ToastAndroid, RefreshControl, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Table, Row } from 'react-native-table-component';
import CheckBox from '@react-native-community/checkbox';
import { Pending_Allocate, Get_user, Allocate_Lead } from '../../../Api/authApi';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Allocatelead = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [userData, setuserData] = useState([]);
  const [user, setuser] = useState('');
  const [selectedRows, setSelectedRows] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const widthArr = [50, 70, 90, 100, 100, 100, 100, 150, 200];

  const fetchPendingAllocate = async () => {
    setRefreshing(true); // Start refreshing
    try {
      const response = await Pending_Allocate();
      console.log("PENDINGGGG", response);
      if (response.msg === 'Load successfully.') {
        setData(response.data);
      } else {
        ToastAndroid.show(response.msg, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('An error occurred', ToastAndroid.SHORT);
    } finally {
      setRefreshing(false); // Stop refreshing
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPendingAllocate();
      getuser();
    }, [])
  );

  const getuser = async () => {
    try {
      const response = await Get_user();
      console.log('user', response);
      if (response.msg === 'Load successfully.') {
        setuserData(response.data);
      } else {
        // Handle error case
      }
    } catch (error) {
      console.log(error);
    }
  };

  const allocateapi = async (userId, leadIds) => {
    console.log('kkkkkkkkkkkkkkkkkkkk', userId, leadIds);
    try {
      const response = await Allocate_Lead(leadIds, userId); // Ensure correct argument order
      console.log('Allocation Response:', response);
      if (response.msg === 'Save successfully.') { // Ensure this matches the response from your server
        Toast.show({
          text1: response.msg,
          type: 'success',
        });
        // Optionally, you could refresh the data here
        fetchPendingAllocate();
      } else {
        Toast.show({
          text1: response.msg,
          type: 'error',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAllocate = () => {
    const leadIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
    if (!user) {
      ToastAndroid.show('Please select a user.', ToastAndroid.SHORT);
      return;
    }
    if (leadIds.length === 0) {
      ToastAndroid.show('Please select at least one lead.', ToastAndroid.SHORT);
      return;
    }
    allocateapi(user, leadIds);
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataToDisplay = data.slice(startIndex, endIndex);

    return dataToDisplay.map((rowData) => (
      <Row
        key={rowData.id}
        data={[
          <CheckBox
            value={!!selectedRows[rowData.id]}
            onValueChange={() => handleCheckboxChange(rowData.id)}
          />,
          rowData.id.toString(),
          rowData.campaign,
          rowData.classification,
          rowData.source,
          rowData.status,
          rowData.name,
          rowData.phone,
          rowData.email,
          rowData.lead_date,
        ]}
        widthArr={widthArr}
        style={[styles.row, { backgroundColor: rowData.id % 2 === 0 ? '#F7F6E7' : '#E7E6E1' }]}
        textStyle={styles.text}
      />
    ));
  };

  const onRefresh = useCallback(() => {
    fetchPendingAllocate();
  }, []);

  const renderPagination = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
      <View style={styles.pagination}>
        <TouchableOpacity
          style={styles.pageButton}
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(currentPage - 1)}
        >
          <AntDesign name="left" color="#625bc5" size={25} />
        </TouchableOpacity>
        <Text style={styles.pageText}>{currentPage} / {totalPages}</Text>
        <TouchableOpacity
          style={styles.pageButton}
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(currentPage + 1)}
        >
          <AntDesign name="right" color="#625bc5" size={25} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.dropdowncontainer1}>
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
        <Pressable style={styles.buttoncontainer1} onPress={handleAllocate}>
          <Text style={styles.text1}>Allocate</Text>
        </Pressable>
      </View>

      <View>
        <ScrollView
          horizontal
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#625bc5']} // Customize loader color if needed
            />
          }
        >
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row
                data={['Select', 'ID', 'Campaign', 'Classification', 'Source', 'Status', 'Name', 'Phone', 'Email', 'Lead Date']}
                widthArr={widthArr}
                style={styles.header}
                textStyle={[styles.text, { color: '#000' }]}
              />
              {renderTableRows()}
            </Table>
          </View>
        </ScrollView>
        {renderPagination()}
      </View>
    </View>
  );
};

export default Allocatelead;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  dropdowncontainer1: {
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#625bc5',
    marginTop: 6,
    margin: 10,
    width: '70%',
  },
  buttoncontainer1: {
    height: 38,
    width: '20%',
    borderRadius: 10,
    backgroundColor: '#625bc5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    color: 'white',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  pageButton: {
    marginHorizontal: 10,
  },
  pageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#625bc5',
    marginLeft: 10,
    marginRight: 10,
  },
  row: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    height: 30, // Adjust this height to your preference
    backgroundColor: '#f1f1f1', // Optional: background color for header
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
});
