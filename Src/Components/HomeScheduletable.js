import React, { useState, useEffect, useCallback } from 'react';
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
  Modal
} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Colors } from '../Comman/Styles';
import { Dashboard } from '../../Api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Get_Task, Get_Lead_Data } from '../../Api/authApi';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScheduletable = () => {
  const navigation = useNavigation();

  const [activeButton, setActiveButton] = useState('Call Schedule');
  const [callScheduleData, setCallScheduleData] = useState([]);
  const [visitScheduleData, setVisitScheduleData] = useState([]);
  const [missedFollowUpData, setMissedFollowUpData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [role, setRole] = useState('');
  const [taskData, setTaskData] = useState([]);
  const [todayTaskData, setTodayTaskData] = useState([]);
  const [upcomingTaskData, setUpcomingTaskData] = useState([]);
  const [missedTaskData, setmissedTaskData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tableHead] = useState(['Lead ID', 'Name', 'Agent', 'Campaign', 'Classification', 'Remind', 'Last Comment']);
  const [widthArr] = useState([100, 150, 100, 100, 100, 150, 200]);

  const taskTableHead = ['S.No', 'User', 'Task', 'Deadline Time', 'Deadline Date', 'Status'];
  const taskWidthArr = [50, 100, 150, 100, 150, 100];


  useFocusEffect(
    useCallback(() => {
      getDashboard();
      fetchTasks();
    }, [])
  );

  const fetchTasks = async () => {
    try {
      const response = await Get_Task();
      console.log(response)
      if (response && response.data) {
        setTaskData(response.data);
      } else {
        Toast.show({
          text1: response.msg,
          type: 'error',
          position: 'bottom',
        });
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Toast.show({
        text1: 'Error fetching tasks',
        type: 'error',
        position: 'bottom',
      });
    }
  };

  useEffect(() => {
    const getRole = async () => {
      const storedRole = await AsyncStorage.getItem('role');
      console.log('hhhhhhhhhhhh', storedRole)
      setRole(storedRole);
    };
    getRole();
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
        const todayTask = response.data.today_task || [];
        const upcomingTask = response.data.upcoming_task || [];
        const missedTask = response.data.missed_task || [];

        setCallScheduleData(todayCallSchedule);
        setVisitScheduleData(todayVisitSchedule);
        setMissedFollowUpData(missedFollowUp);
        setTodayTaskData(todayTask);
        setUpcomingTaskData(upcomingTask);
        setmissedTaskData(missedTask);

        setTableData(todayCallSchedule);
        setTableData1(todayTask);

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

  const onPressButton1 = (type) => {
    setActiveButton(type);
    setCurrentPage(1);
    switch (type) {
      case 'Today Task':
        setTableData1(todayTaskData);
        break;
      case 'Upcoming Task':
        setTableData1(upcomingTaskData);
        break;
      case 'Missed Follow Up':
        setTableData1(missedTaskData);
        break;
      default:
        setTableData1(todayTaskData);
    }
  };


  const leadedit = (rowData) => {
    navigation.navigate('Update Lead', { leadid: rowData.id, status: rowData.status });
  };

  const openModal = async item => {
    setModalVisible(true);
    try {
      const response = await Get_Lead_Data(item.id);
      if (response.msg === 'Load successfully') {
        setSelectedItem(response.data);
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: 'Error',
        type: 'error',
      });
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const LeadModal = ({ item }) => {
    if (!item) return null;

    const leadComments = item.lead_comment || [];

    return (
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalText}>Lead Details</Text>
                <Pressable onPress={closeModal}>
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={25}
                    color="#625bc5"
                  />
                </Pressable>
              </View>

              <ScrollView contentContainerStyle={{}}>
                <View style={{ flexDirection: 'column', padding: 10 }}>
                  <Text style={styles.modalText}>
                    Name: {item.name || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Email: {item.email || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Mobile: {item.phone || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Address: {item.field3 || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    DOB: {item.app_dob || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    DOA: {item.app_doa || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Source: {item.source || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Type: {item.type || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Category: {item.cat_name || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    SubCategory: {item.subcatname || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    State: {item.field1 || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    City: {item.field2 || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Classification: {item.classification || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Project: {item.project_id || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Campaign: {item.campaign || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Status: {item.status || 'N/A'}
                  </Text>
                </View>

                <View style={{ padding: 10 }}>
                  <View style={styles.modalheading}>
                    <Text style={styles.modalText}>Lead Comments</Text>
                  </View>
                  {leadComments.length > 0 ? (
                    leadComments.map((comment, index) => (
                      <View key={index} style={styles.commentContainer}>
                        <Text style={styles.commentText}>
                          {comment.comment || 'No comment text'}
                        </Text>
                        <Text style={styles.modalText}>
                          Status: {comment.status || 'N/A'}
                        </Text>
                        <Text style={styles.modalText}>
                          Remind: {comment.remind || 'N/A'}
                        </Text>
                        <Text style={styles.modalText}>
                          Created Date: {comment.created_date || 'N/A'}
                        </Text>

                        {index !== leadComments.length - 1 && (
                          <View style={styles.separator} />
                        )}
                      </View>
                    ))
                  ) : (
                    <Text style={styles.modalText}>No comments available</Text>
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let dataToDisplay = tableData.slice(startIndex, endIndex);

    return dataToDisplay.map((rowData, index) => {
      return (
        <Row
          key={startIndex + index}
          data={[
            rowData.id.toString(),
            rowData.name,
            rowData.agent,
            rowData.campaign,
            rowData.classification,
            `${rowData.remind_date} ${rowData.remind_time}`,
            <Pressable
              onPress={() => handlePhoneCall(rowData.phone)}
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}
            >
              <Text style={{ fontWeight: '700', fontSize: 14 }}>{rowData.last_comment}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Pressable onPress={() => openModal(rowData)} style={styles.callIcon}>
                  <AntDesign name="eyeo" color="#625bc5" size={20} />
                </Pressable>
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
      );
    });

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

  const renderTaskRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let dataToDisplay = tableData1.slice(startIndex, endIndex);

    return dataToDisplay.map((rowData, index) => (
      <Row
        key={startIndex + index}
        data={[
          (startIndex + index + 1).toString(),
          rowData.username || 'N/A',
          rowData.task || 'N/A',
          rowData.deadLineTime || 'N/A',
          rowData.deadLineDate || 'N/A',
          rowData.status || 'N/A',
        ]}
        widthArr={taskWidthArr}
        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
        textStyle={styles.text}
      />
    ));
  };

  return (
    <View style={styles.container}>

      {['staff', 'postsale'].includes(role) && (
        <View style={styles.body}>
          <Pressable
            style={[
              styles.button,
              activeButton === 'Today Task' && { backgroundColor: '#ddf' },
            ]}
            onPress={() => onPressButton1('Today Task')}
          >
            <Text style={[styles.text, activeButton === 'Today Task' && { color: '#625bc5' }]}>Today Task</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              activeButton === 'Upcoming Task' && { backgroundColor: '#ddf' }
            ]}
            onPress={() => onPressButton1('Upcoming Task')}
          >
            <Text style={[styles.text, activeButton === 'Upcoming Task' && { color: '#625bc5' }]}>Upcoming Task</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              activeButton === 'Missed Follow Up' && { backgroundColor: '#ddf' }
            ]}
            onPress={() => onPressButton1('Missed Follow Up')}
          >
            <Text style={[styles.text, activeButton === 'Missed Follow Up' && { color: '#625bc5' }]}>Missed Task</Text>
          </Pressable>
        </View>
      )}

      {['team_manager', 'salesman', 'telecaller'].includes(role) && (
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
      )}

      <ScrollView
        horizontal={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

        {['team_manager', 'salesman', 'telecaller'].includes(role) && (
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
        )}

        {['staff', 'postsale'].includes(role) && (
          <View style={{ top: 10 }}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row
                data={taskTableHead}
                widthArr={taskWidthArr}
                style={styles.header}
                textStyle={[styles.text, { color: '#FFFFFF' }]}
              />
              {renderTaskRows()}
            </Table>
          </View>
        )}

      </ScrollView>
      {renderPagination()}
      {selectedItem && <LeadModal item={selectedItem} />}
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalBackground: {
    backgroundColor: 'transparent', // Make sure this is transparent
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    elevation: 5,
  },
  modalheading: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  commentsContainer: {
    height: '30%',
    padding: 10,
  },
});

export default HomeScheduletable;
