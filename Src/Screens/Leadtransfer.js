import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Table, Row } from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Get_user, Get_Status, Get_Lead } from '../../Api/authApi';

const Leadtransfer = () => {
  const [status, setstatus] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const widthArr = [70, 70, 70, 100, 100, 100, 150, 120];
  const [statusData, setStatusData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [leadData, setLeadData] = useState([]);

  useEffect(() => {
    getUser();
    getStatus();
    getLead();  
  }, []);

  const getUser = async () => {
    try {
      const response = await Get_user();
      if (response.msg === 'Load successfully.') {
        setUserData(response.data);
      }
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const getStatus = async () => {
    try {
      const response = await Get_Status();
      if (response.msg === '') {
        setStatusData(response.data);
      }
    } catch (error) {
      console.log('Error fetching statuses:', error);
    }
  };

  const getLead = async (user = '', status = '') => {
    try {
      const response = await Get_Lead();
      if (response.msg === 'Load successfully') {
        let data = response.data;

        if (user) {
          data = data.filter(item => item.agent === user);
        }

        if (status) {
          data = data.filter(item => item.status === status);
        }

        setLeadData(data);
      } else {
        setLeadData([]);
      }
    } catch (error) {
      console.log('Error fetching leads:', error);
      setLeadData([]);
    }
  };

  const handleSearch = () => {
    getLead(selectedUser, status);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(leadData.length / itemsPerPage);

    return (
      <View style={styles.pagination}>
        <TouchableOpacity
          style={styles.pageButton}
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(currentPage - 1)}
        >
          <AntDesign name="left" color="#625bc5" size={25} />
        </TouchableOpacity>
        <Text style={styles.pageText}>
          {currentPage} / {totalPages}
        </Text>
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

  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataToDisplay = leadData.slice(startIndex, endIndex);

    // Debugging: Check data being displayed
    console.log('Data to display:', dataToDisplay);

    return dataToDisplay.map((rowData, index) => (
      <Row
        key={index}
        data={[
          (rowData.id ?? '').toString(),
          rowData.source ?? '',
          rowData.campaign ?? '',
          rowData.classification ?? '',
          rowData.status ?? '',
          rowData.name ?? '',
          rowData.email ?? '',
          rowData.phone ?? '',
        ]}
        widthArr={widthArr}
        style={[styles.row, { backgroundColor: index % 2 === 0 ? '#F7F6E7' : '#E7E6E1' }]}
        textStyle={styles.text}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View style={{ width: '49%' }}>
            <Text>From</Text>
            <View style={styles.dropdowncontainer1}>
              <Picker
                selectedValue={selectedUser}
                onValueChange={itemValue => setSelectedUser(itemValue)}>
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

          <View style={{ width: '49%' }}>
            <Text>Status</Text>
            <View style={styles.dropdowncontainer1}>
              <Picker
                selectedValue={status}
                onValueChange={itemValue => setstatus(itemValue)}>
                <Picker.Item label="Select Status" value="" />
                {statusData.map(statusItem => (
                  <Picker.Item
                    key={statusItem.id}
                    label={statusItem.name}
                    value={statusItem.name}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.buttoncontainer1} onPress={handleSearch}>
          <Text style={styles.text1}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={{ top: 10 }}>
        <ScrollView horizontal>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row
                data={['Lead Id', 'Source', 'Campaign', 'Classification', 'Status', 'Name', 'Email', 'Phone']}
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

export default Leadtransfer;

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
  },
  buttoncontainer1: {
    height: 38,
    width: '20%',
    borderRadius: 10,
    backgroundColor: '#625bc5',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
  text1: {
    color: 'white',
  },
  top: {
    flexDirection: 'column',
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
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  header: {
    height: 60,
    backgroundColor: '#f1f8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});