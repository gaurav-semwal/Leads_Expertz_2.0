import React, { useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Pressable,
  Linking,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Colors } from '../Comman/Styles';
import { Dashboard } from '../../Api/authApi';

const HomeScheduletable = () => {
  const navigation = useNavigation();

  const [activeButton, setActiveButton] = useState('Call Schedule');
  const [callScheduleData, setCallScheduleData] = useState([]);
  const [visitScheduleData, setVisitScheduleData] = useState([]);
  const [missedFollowUpData, setMissedFollowUpData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [tableHead] = useState(['Lead ID', 'Name', 'Campaign', 'Classification', 'Remind', 'Last Comment']);
  const [widthArr] = useState([100, 150, 100, 100, 150, 200]);

  useEffect(() => {
    getDashboard();
  }, []);
  
  const getDashboard = async () => {
    setLoading(true);
    try {
      const response = await Dashboard();
      console.log('GETTING THE DATA FROM THE DASHBOARD -->', response.data);
  
      if (response.data) {
        const missedFollowUp = response.data.missedFollowUp || [];
        const todayCallSchedule = response.data.todayCallScheduled || [];
        const todayVisitSchedule = response.data.todayVisitScheduled || [];
  
        // Set the states with the specific data for each schedule
        setCallScheduleData(todayCallSchedule);
        setVisitScheduleData(todayVisitSchedule);
        setMissedFollowUpData(missedFollowUp);
  
        // Default to displaying the call schedule
        setTableData(todayCallSchedule);
      } else {
        console.warn('Unexpected response format:', response);
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: 'Error',
        type: 'error',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
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
    navigation.navigate('Update Lead', { leadid: rowData.id, status: rowData.status });
  };

  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let dataToDisplay = tableData.slice(startIndex, endIndex);

    return dataToDisplay.map((rowData, index) => (
      <Row
        key={startIndex + index}
        data={[
          rowData.id.toString(),
          rowData.name,
          rowData.campaign,
          rowData.classification,
          rowData.updated_date,
          <Pressable
            onPress={() => handlePhoneCall(rowData.phone)}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}
          >
            <Text style={{ fontWeight: '700', fontSize: 14 }}>{rowData.last_comment}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Pressable onPress={() => leadedit(rowData)} style={styles.callIcon}>
                <AntDesign name="edit" color="#625bc5" size={20} />
              </Pressable>
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

  const handlePhoneCall = (phone) => {
    const phoneNumber = `tel:${phone}`;
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

  const onRefresh = () => {
    setRefreshing(true);
    getDashboard();
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.Button} />
      </View>
    );
  }

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
      <ScrollView
        horizontal={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 50,
    backgroundColor: '#625bc5',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
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
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
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
    marginRight: 10,
  },
});

export default HomeScheduletable;
