import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Table, Row } from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Allocatelead = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [currentPage, setCurrentPage] = useState(1);
  const widthArr = [50, 70, 70, 70, 100, 100, 100, 100, 120, 100]; // Adjusted widths for table columns 

  const upcomingBirthdays = [
    { id: 1, sno: 1, leadid: 12, source: 'Online', campaign: 'hdnd', classification: 'Admin', status: 'online', name: 'Isack', phone: '9876545', email: 'alicesmith@example.com', leaddate: '12-9-200' },
    { id: 2, sno: 2, leadid: 13, source: 'Offline', campaign: 'abc', classification: 'User', status: 'offline', name: 'John Doe', phone: '9876545', email: 'johndoe@example.com', leaddate: '11-8-200' },
    { id: 3, sno: 3, leadid: 14, source: 'Online', campaign: 'xyz', classification: 'Admin', status: 'online', name: 'Jane Smith', phone: '9876545', email: 'janesmith@example.com', leaddate: '10-7-200' },
    { id: 4, sno: 4, leadid: 15, source: 'Offline', campaign: 'pqr', classification: 'User', status: 'offline', name: 'Michael Johnson', phone: '9876545', email: 'michael@example.com', leaddate: '9-6-200' },
  ];

  const renderPagination = () => {
    const totalPages = Math.ceil(upcomingBirthdays.length / itemsPerPage);

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
    const dataToDisplay = upcomingBirthdays.slice(startIndex, endIndex);

    return dataToDisplay.map((rowData) => (
      <Row
        key={rowData.id}
        data={[
          rowData.sno.toString(),
          rowData.leadid.toString(),
          rowData.source,
          rowData.campaign,
          rowData.classification,
          rowData.status,
          rowData.name,
          rowData.phone.toString(),
          rowData.email,
          rowData.leaddate,
        ]}
        widthArr={widthArr}
        style={[styles.row, { backgroundColor: rowData.id % 2 === 0 ? '#F7F6E7' : '#E7E6E1' }]}
        textStyle={styles.text}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.dropdowncontainer1}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Select User" value="" />
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Self" value="Self" />
            <Picker.Item label="Team" value="Team" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.buttoncontainer1}>
          <Text style={styles.text1}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pickerContainer}>
                <Text style={styles.text}>Show</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={itemsPerPage}
                        style={styles.picker}
                        onValueChange={(itemValue) => setItemsPerPage(itemValue)}
                    >
                        <Picker.Item label="10" value={10} />
                        <Picker.Item label="100" value={100} />
                        <Picker.Item label="500" value={500} />
                        <Picker.Item label="All" value={upcomingBirthdays.length} />
                    </Picker>
                </View>
                <Text style={styles.text}>Entries</Text>
            </View>

      <View style={styles.pickerContainer}>
                <Text style={styles.text}>Show</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={itemsPerPage}
                        style={styles.picker}
                        onValueChange={(itemValue) => setItemsPerPage(itemValue)}
                    >
                        <Picker.Item label="10" value={10} />
                        <Picker.Item label="100" value={100} />
                        <Picker.Item label="500" value={500} />
                        <Picker.Item label="All" value={upcomingBirthdays.length} />
                    </Picker>
                </View>
                <Text style={styles.text}>Entries</Text>
            </View>

      <View style={styles.pickerContainer}>
                <Text style={styles.text}>Show</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={itemsPerPage}
                        style={styles.picker}
                        onValueChange={(itemValue) => setItemsPerPage(itemValue)}
                    >
                        <Picker.Item label="10" value={10} />
                        <Picker.Item label="100" value={100} />
                        <Picker.Item label="500" value={500} />
                        <Picker.Item label="All" value={upcomingBirthdays.length} />
                    </Picker>
                </View>
                <Text style={styles.text}>Entries</Text>
            </View>

      <View style={styles.pickerContainer}>
                <Text style={styles.text}>Show</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={itemsPerPage}
                        style={styles.picker}
                        onValueChange={(itemValue) => setItemsPerPage(itemValue)}
                    >
                        <Picker.Item label="10" value={10} />
                        <Picker.Item label="100" value={100} />
                        <Picker.Item label="500" value={500} />
                        <Picker.Item label="All" value={upcomingBirthdays.length} />
                    </Picker>
                </View>
                <Text style={styles.text}>Entries</Text>
            </View>

      <View>
        <ScrollView horizontal>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row
                data={['S.No', 'Lead Id', 'Source', 'Campaign', 'Classification', 'Status', 'Name', 'Phone', 'Email', 'Lead Date']}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginBottom:20
},
pickerWrapper: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginHorizontal: 10,
    width: 110, 
    overflow: 'hidden'
},
picker: {
    height: 25, 
    color: '#000' 
},
});
