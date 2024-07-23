import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Pressable, Linking } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Colors } from '../Comman/Styles';

const HomeScheduletable = () => {
  const navigation = useNavigation();

  const [activeButton, setActiveButton] = useState('Call Schedule');
  const [callScheduleData, setCallScheduleData] = useState([
    { id: 1, name: 'John Doe', campaign: 'Campaign A', classification: 'High', last_updated: '2023-01-01', comments: 'Lorem ipsum', mobile: '1234567890' },
    { id: 2, name: 'Alice Smith', campaign: 'Campaign B', classification: 'Medium', last_updated: '2023-01-02', comments: 'Dolor sit amet', mobile: '9876543210' },
    // Add more dummy data as needed
  ]);
  const [visitScheduleData, setVisitScheduleData] = useState([
    { id: 1, name: 'Bob Brown', campaign: 'Campaign C', classification: 'Low', last_updated: '2023-01-03', comments: 'Consectetur adipiscing elit', mobile: '4567890123' },
    { id: 2, name: 'Emily Johnson', campaign: 'Campaign D', classification: 'High', last_updated: '2023-01-04', comments: 'Sed do eiusmod tempor', mobile: '2345678901' },
    // Add more dummy data as needed
  ]);
  const [missedFollowUpData, setMissedFollowUpData] = useState([
    { id: 1, name: 'David Lee', campaign: 'Campaign E', classification: 'Medium', last_updated: '2023-01-05', comments: 'Ut labore et dolore magna', mobile: '3456789012' },
    { id: 2, name: 'Sarah Clark', campaign: 'Campaign F', classification: 'High', last_updated: '2023-01-06', comments: 'Ut enim ad minim veniam', mobile: '5678901234' },
    // Add more dummy data as needed
  ]);
  const [tableHead] = useState(['Lead ID', 'Name', 'Campaign', 'Classification', 'Remind', 'Last Comment']);
  const [widthArr] = useState([100, 150, 100, 100, 150, 150]);
  const [tableData, setTableData] = useState(callScheduleData);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useFocusEffect(
    React.useCallback(() => {
      // You can call handleLoginPress here if needed for real data fetch
      // handleLoginPress();
    }, []),
  );

  const onPressButton = (type) => {
    setActiveButton(type);
    setCurrentPage(1);
    switch (type) {
      case 'Call Schedule':
        setTableData(callScheduleData);
        break;
      case 'Visit Schedule':
        setTableData(visitScheduleData);
        break;
      case 'Missed Follow Up':
        setTableData(missedFollowUpData);
        break;
      default:
        setTableData(callScheduleData);
    }
  };

  const leadedit = (rowData) => {
    navigation.navigate('leadupdate', { leadid: rowData.id, status: rowData.status });
  };

  const renderTableRows = () => {
    let dataToDisplay = tableData;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return Array.isArray(dataToDisplay) && dataToDisplay.slice(startIndex, endIndex).map((rowData, index) => (
      <Row
        key={startIndex + index}
        data={[
          rowData.id.toString(),
          rowData.name,
          rowData.campaign,
          rowData.classification,
          rowData.last_updated,
          <Pressable onPress={() => handlePhoneCall(rowData.mobile)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
            <Text style={{ fontWeight: '700', fontSize: 14 }}>{rowData.comments}</Text>
            <View style={{ flexDirection: 'row' }}>
              {/* Edit Icon */}
              <Pressable onPress={() => leadedit(rowData)} style={styles.callIcon}>
                <AntDesign name="edit" color="#625bc5" size={20} />
              </Pressable>
              {/* Phone Icon */}
              <View style={styles.callIcon}>
                <AntDesign name="phone" color="#625bc5" size={20} />
              </View>
            </View>
          </Pressable>
        ]}
        widthArr={widthArr}
        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
        textStyle={styles.text}
      />
    ));
  };

  const handlePhoneCall = (mobileNumber) => {
    const phoneNumber = `tel:${mobileNumber}`;
    Linking.openURL(phoneNumber);
  };

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
      <View style={styles.body}>
        <Pressable
          style={[
            styles.button,
            activeButton === 'Call Schedule' && { backgroundColor: '#ddf' },
          ]}
          onPress={() => onPressButton('Call Schedule')}
        >
          <Text style={[styles.text, activeButton === 'Call Schedule' && { color: '#625bc5' }]}>Call Schedule</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            activeButton === 'Visit Schedule' && { backgroundColor: '#ddf' }
          ]}
          onPress={() => onPressButton('Visit Schedule')}
        >
          <Text style={[styles.text, activeButton === 'Visit Schedule' && { color: '#625bc5' }]}>Visit Schedule</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            activeButton === 'Missed Follow Up' && { backgroundColor: '#ddf' }
          ]}
          onPress={() => onPressButton('Missed Follow Up')}
        >
          <Text style={[styles.text, activeButton === 'Missed Follow Up' && { color: '#625bc5' }]}>Missed Follow Up</Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={[styles.text, { color: '#FFFFFF' }]}
            />
            {renderTableRows()}
          </Table>
        </View>
      </ScrollView>
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    height: 50,
    backgroundColor: '#625bc5'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1'
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  pageButton: {
    marginHorizontal: 5
  },
  pageText: {
    color: '#625bc5',
    fontWeight: 'bold'
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.Button,
    width: '30%',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#e6ebf5',
  },
  callIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    marginRight: 10
  },
});

export default HomeScheduletable;
