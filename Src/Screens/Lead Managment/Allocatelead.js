import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Table, Row } from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Pending_Allocate } from '../../../Api/authApi';

const Allocatelead = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]); // State to hold API data
  const widthArr = [50, 70, 90, 100, 100, 100, 100, 150, 200]; // Adjusted widths for table columns 

  const fetchPendingAllocate = async () => {
    try {
      const response = await Pending_Allocate();
      console.log("PENDINGGGG", response);
      if (response.msg === 'Load successfully.') {
        setData(response.data); // Update state with API data
      } else {
        // Handle error case
        ToastAndroid.show(response.msg, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('An error occurred', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
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
    const dataToDisplay = data.slice(startIndex, endIndex);

    return dataToDisplay.map((rowData) => (
      <Row
        key={rowData.id}
        data={[
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

      <View>
        <ScrollView horizontal>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row
                data={['ID', 'Campaign', 'Classification', 'Source', 'Status', 'Name', 'Phone', 'Email', 'Lead Date']}
                widthArr={widthArr}
                style={styles.header}
                textStyle={[styles.text, { color: '#000' }]}
              />
              {renderTableRows()}
            </Table>
          </View>
        </ScrollView>


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
});
