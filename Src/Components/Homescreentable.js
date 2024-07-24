import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScheduletable from './HomeScheduletable';

const Homescreentable = () => {
  const [activeButton, setActiveButton] = useState('Upcoming Birthday');
  const [tableData, setTableData] = useState([]); 
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [widthArr] = useState([100, 150, 150, 100, 150]); 

  const upcomingBirthdays = [
    { id: 1, agentName: 'John Doe', applicantName: 'Jane Doe', appContact: '123-456-7890', appCity: 'New York', birthday: '1990-05-15' },
    { id: 2, agentName: 'Alice Smith', applicantName: 'Bob Smith', appContact: '987-654-3210', appCity: 'Los Angeles', birthday: '1985-08-20' },
  ];

  const upcomingAnniversaries = [
    { id: 1, agentName: 'David Brown', applicantName: 'Emily Brown', appContact: '456-789-0123', appCity: 'Chicago', birthday: '1988-12-25' },
    { id: 2, agentName: 'Michael Johnson', applicantName: 'Sarah Johnson', appContact: '234-567-8901', appCity: 'Houston', birthday: '1995-02-10' },
  ];

  // useEffect to set initial state when component mounts
  useEffect(() => {
    setTableData(upcomingBirthdays); // Set table data to upcoming birthdays initially
  }, []);

  // Function to handle button press and set active button and corresponding table data
  const onPressButton = (type) => {
    setActiveButton(type);
    setCurrentPage(1);
    switch (type) {
      case 'Upcoming Birthday':
        setTableData(upcomingBirthdays); // Set table data to upcoming birthdays
        break;
      case 'Upcoming Anniversary':
        setTableData(upcomingAnniversaries); // Set table data to upcoming anniversaries
        break;
      default:
        setTableData(upcomingBirthdays); // Default to upcoming birthdays
    }
  };

  // Function to render pagination UI
  const renderPagination = () => {
    const totalPages = Math.ceil(tableData.length / itemsPerPage);

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

  // Function to render table rows based on current page and items per page
  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataToDisplay = tableData.slice(startIndex, endIndex);

    return dataToDisplay.map((rowData, index) => (
      <Row
        key={index}
        data={[
          rowData.agentName,
          rowData.applicantName,
          rowData.appContact,
          rowData.appCity,
          rowData.birthday
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

      {/* Pagination controls */}
      {renderPagination()}

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
    marginTop: 10,
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  pageButton: {
    marginHorizontal: 5,
  },
  pageText: {
    color: '#625bc5',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
