import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Table, Row } from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import { Get_user, Get_Status, Get_Lead, Lead_Transfer, Search_lead } from '../../Api/authApi';
import Toast from 'react-native-toast-message';

const Leadtransfer = () => {
  const [status, setStatus] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [transferUserId, setTransferUserId] = useState('');
  const [transferStatus, setTransferStatus] = useState('');
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showTransferFields, setShowTransferFields] = useState(false);
  const widthArr = [70, 70, 70, 100, 100, 100, 150, 120];
  const [statusData, setStatusData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [leadData, setLeadData] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]); // Changed to an array

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

  const getLead = async (userId = '', status = '') => {
    try {
      const response = await Get_Lead();
      if (response.msg === 'Load successfully') {
        let data = response.data;

        if (userId) {
          data = data.filter(item => item.agent === userId);
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

  const handleSearch = async () => {
    try {
      const response = await Search_lead(selectedUserId, status);
      if (response.msg === 'Load Successfully') {
        setLeadData(response.data);
        setShowTransferFields(true);
      } else {
        setLeadData([]);
        setShowTransferFields(false);
      }
    } catch (error) {
      console.log('Error fetching leads:', error);
      setLeadData([]);
      setShowTransferFields(false);
    }
  };

  const handleCheckboxChange = (leadId) => {
    setSelectedLeads(prevState => {
      // If leadId is already in the array, remove it, otherwise add it
      if (prevState.includes(leadId)) {
        return prevState.filter(id => id !== leadId);
      } else {
        return [...prevState, leadId];
      }
    });
  };

  const handleTransfer = async () => {
    console.log('Transferring leads:', selectedLeads, 'to user:', transferUserId, 'with status:', transferStatus);
    try {
      const response = await Lead_Transfer(transferStatus, transferUserId, selectedLeads);
      console.log(response);
      if (response.msg === 'Save Successfully') {
        Toast.show({
          text1: 'Save Successfully',
          type: 'success',
        });
        // setSelectedLeads([]);
        // setTransferUserId('');
        // setTransferStatus('');

        getLead();
      } else {
      }
    } catch (error) {
      Toast.show({
        text1: response.msg,
        type: 'success',
      });
      console.log('Error transferring leads:', error);
    }
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

    return dataToDisplay.map((rowData, index) => (
      <Row
        key={rowData.id}
        data={[
          <CheckBox
            value={selectedLeads.includes(rowData.id)}
            onValueChange={() => handleCheckboxChange(rowData.id)}
          />,
          (rowData.id ?? '').toString(),
          rowData.source ?? '',
          rowData.campaign ?? '',
          rowData.classification ?? '',
          rowData.status ?? '',
          rowData.name ?? '',
          rowData.email ?? '',
          rowData.phone ?? '',
        ]}
        widthArr={[40, ...widthArr]} 
        style={[styles.row, { backgroundColor: index % 2 === 0 ? '#F7F6E7' : '#E7E6E1' }]}
        textStyle={styles.text}
      />
    ));
  };

  return (
    <ScrollView style={styles.container}>
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
                selectedValue={selectedUserId}
                onValueChange={itemValue => setSelectedUserId(itemValue)}>
                <Picker.Item label="Select User" value="" />
                {userData.map(userItem => (
                  <Picker.Item
                    key={userItem.id}
                    label={`${userItem.name} (${userItem.role.replace('_', ' ')})`}
                    value={userItem.id} // Use ID
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
                onValueChange={itemValue => setStatus(itemValue)}>
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

      {showTransferFields && (
        <View style={styles.transferSection}>
          <Text>Transfer To</Text>
          <View style={styles.dropdowncontainer1}>
            <Picker
              selectedValue={transferUserId}
              onValueChange={itemValue => setTransferUserId(itemValue)}>
              <Picker.Item label="Select User" value="" />
              {userData.map(userItem => (
                <Picker.Item
                  key={userItem.id}
                  label={`${userItem.name} (${userItem.role.replace('_', ' ')})`}
                  value={userItem.id} // Use ID
                />
              ))}
            </Picker>
          </View>

          <Text>Status After Transfer</Text>
          <View style={styles.dropdowncontainer1}>
            <Picker
              selectedValue={transferStatus}
              onValueChange={itemValue => setTransferStatus(itemValue)}>
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

          <TouchableOpacity style={styles.buttoncontainer2} onPress={handleTransfer}>
            <Text style={styles.text1}>Transfer</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ top: 10 }}>
        <ScrollView horizontal>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row
                data={['Select', 'Lead Id', 'Source', 'Campaign', 'Classification', 'Status', 'Name', 'Email', 'Phone']}
                widthArr={[40, ...widthArr]}
                style={styles.header}
                textStyle={[styles.text, { color: '#000' }]}
              />
              {renderTableRows()}
            </Table>
          </View>
        </ScrollView>

        {renderPagination()}
      </View>
    </ScrollView>
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
  buttoncontainer2: {
    height: 38,
    width: '20%',
    borderRadius: 10,
    backgroundColor: '#625bc5',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    alignSelf: 'center',
  },
  text1: {
    color: 'white',
  },
  top: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  transferSection: {
    marginBottom: 20,
    borderRadius: 10,
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
