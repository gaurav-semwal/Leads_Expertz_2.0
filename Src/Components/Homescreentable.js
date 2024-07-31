import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScheduletable from './HomeScheduletable';
import { Get_Birthday } from '../../Api/authApi';

const Homescreentable = () => {
  const [activeButton, setActiveButton] = useState('Upcoming Birthday');
  const [tableData, setTableData] = useState([]); 
  const [widthArr] = useState([100, 150, 150, 100, 150]); 

  useEffect(() => {
    getBirthday();
  }, []);

  const getBirthday = async () => {
    try {
      const response = await Get_Birthday();
      console.log('BIRTHDAY SEMWAL', response);
      if (response.msg === '') {
        setTableData(response.data);
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: 'Error',
        type: 'error',
      });
    }
  };

  // Function to handle button press and set active button and corresponding table data
  const onPressButton = (type) => {
    setActiveButton(type);
    switch (type) {
      case 'Upcoming Birthday':
        setTableData(response.data.filter(item => item.type === 'Birthday')); // Filter data for birthdays
        break;
      case 'Upcoming Anniversary':
        setTableData(response.data.filter(item => item.type === 'Anniversary')); // Filter data for anniversaries
        break;
      default:
        setTableData(response.data); // Default to showing all data
    }
  };

  // Function to render table rows
  const renderTableRows = () => {
    return tableData.map((rowData, index) => (
      <Row
        key={index}
        data={[
          rowData.agent,
          rowData.name || 'N/A',
          rowData.phone || 'N/A',
          rowData.field1 || 'N/A',
          rowData.lead_date || 'N/A'
        ]}
        widthArr={widthArr}
        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
        textStyle={styles.text}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {/* Pressable buttons to switch between upcoming birthdays and anniversaries */}
        <Pressable
          style={[styles.button, activeButton === 'Upcoming Birthday' && { backgroundColor: '#ddf' }]}
          onPress={() => onPressButton('Upcoming Birthday')}
        >
          <Text style={[styles.text, activeButton === 'Upcoming Birthday' && { color: '#625bc5' }]}>Upcoming Birthday</Text>
        </Pressable>
        <Pressable
          style={[styles.button, activeButton === 'Upcoming Anniversary' && { backgroundColor: '#ddf' }]}
          onPress={() => onPressButton('Upcoming Anniversary')}
        >
          <Text style={[styles.text, activeButton === 'Upcoming Anniversary' && { color: '#625bc5' }]}>Upcoming Anniversary</Text>
        </Pressable>
      </View>

      {/* Table to display data */}
      <ScrollView horizontal>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row
              data={['Agent Name', 'Applicant Name', 'App. Contact', 'App. City', 'Birthday']}
              widthArr={widthArr}
              style={styles.header}
              textStyle={[styles.text, { color: '#000' }]}
            />
            {renderTableRows()}
          </Table>
        </View>
      </ScrollView>

      {/* Additional component */}
      <HomeScheduletable />
    </View>
  );
};

export default Homescreentable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#625bc5',
    width: '48%',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#e6ebf5',
    marginVertical: 10,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 6,
  },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1',
  },
});
